import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, HERO_BG_IMAGE, APPAREL_ITEMS } from '../data/products';

export const HomeView: React.FC = () => {
  const {
    navigateTo,
    addToCart,
    addApparelOrKitToCart,
    toggleWishlist,
    isWishlisted,
    openSizeModal,
    showToast,
    setCatalogFilters
  } = useStore();

  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'trending'>('all');
  const [selectedVaultSizes, setSelectedVaultSizes] = useState<Record<string, string>>({
    'monochrome-heritage': 'UK 8',
    'heavy-linen-field-overshirt': 'M',
    'strata-slip-on': 'UK 9'
  });

  const featuredProducts = PRODUCTS.slice(0, 4);

  const filteredSilhouettes = featuredProducts.filter(p => {
    if (activeTab === 'new') return p.badge === 'NEW' || p.id === 'veloce-carbon-knit';
    if (activeTab === 'trending') return p.trending || p.badge === 'TRENDING' || p.badge === 'HOT';
    return true;
  });

  const handleDepartmentClick = (cat: string) => {
    setCatalogFilters(prev => ({
      ...prev,
      category: 'All Footwear',
      silhouette: cat === 'Sneakers' ? ['Sneakers'] : prev.silhouette
    }));
    navigateTo('catalog');
  };

  const handleVaultSizeSelect = (itemId: string, size: string) => {
    setSelectedVaultSizes(prev => ({ ...prev, [itemId]: size }));
    showToast(`Size ${size} selected`);
  };

  const handleAddBundle = () => {
    addApparelOrKitToCart(
      'Crisp Oxford Supima Shirt',
      1899,
      2499,
      APPAREL_ITEMS[1].image,
      'Medium',
      'Eggshell White'
    );
    addApparelOrKitToCart(
      'Architect Tapered Chinos',
      1581,
      2199,
      APPAREL_ITEMS[2].image,
      '32',
      'Muted Olive'
    );
    showToast('The Weekday Uniform Bundle (2 items) added to bag!');
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative w-full min-h-[92vh] flex items-end justify-start overflow-hidden bg-[#000000] -mt-20">
        {/* Hero Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            alt="STEPSTYLE Editorial Season Drop"
            className="w-full h-full object-cover object-center filter brightness-[0.88] scale-[1.01] transition-transform duration-1000 ease-out"
            src={HERO_BG_IMAGE}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 pb-16 pt-36">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#497cff] animate-pulse"></span>
              Spring / Summer 2025 Capsule
            </div>

            <h1 className="font-display text-[48px] sm:text-[60px] md:text-[76px] leading-[1.05] tracking-tight font-bold text-white uppercase">
              Step into your <br />
              <span className="text-[#dadada] font-light italic tracking-normal lowercase font-body text-[52px] sm:text-[68px] md:text-[84px] leading-none block mt-1">
                everyday
              </span>{' '}
              Style
            </h1>

            <p className="text-[16px] md:text-[18px] text-[#e8e8e8] max-w-xl leading-relaxed">
              Discover shoes and everyday essentials designed for comfort, confidence, and effortless modern style. Engineered with architectural precision.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById('featured-shoes');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-black hover:bg-neutral-200 transition-all duration-300 rounded-lg text-xs tracking-wider uppercase font-bold shadow-xl hover:-translate-y-0.5 flex items-center gap-3"
                type="button"
              >
                <span>Shop Now</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('categories');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all duration-300 rounded-lg text-xs tracking-wider uppercase font-semibold flex items-center gap-2"
                type="button"
              >
                <span>Explore Collection</span>
              </button>
            </div>
          </div>

          {/* Quick Perk Floating Bar */}
          <div className="mt-14 pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/15 text-white">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3.5 rounded-lg">
              <span className="material-symbols-outlined text-[#dce2f3] text-[24px]">
                footprint
              </span>
              <div>
                <span className="block text-xs uppercase tracking-wider text-white font-bold">
                  Premium Italian Sole Tech
                </span>
                <span className="text-[13px] text-[#dadada]">
                  High-density shock absorption
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3.5 rounded-lg">
              <span className="material-symbols-outlined text-[#dce2f3] text-[24px]">
                eco
              </span>
              <div>
                <span className="block text-xs uppercase tracking-wider text-white font-bold">
                  Ethically Sourced Linen
                </span>
                <span className="text-[13px] text-[#dadada]">
                  100% certified organic fibers
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3.5 rounded-lg">
              <span className="material-symbols-outlined text-[#dce2f3] text-[24px]">
                schedule
              </span>
              <div>
                <span className="block text-xs uppercase tracking-wider text-white font-bold">
                  Designed for 24/7 Comfort
                </span>
                <span className="text-[13px] text-[#dadada]">
                  From morning desk to late soirées
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY (BENTO GRID) */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-24" id="categories">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#585f6c] block mb-2 font-bold">
              Disciplined Wardrobe
            </span>
            <h2 className="font-headline text-[32px] md:text-[42px] font-bold tracking-tight text-black uppercase">
              Curated Departments
            </h2>
          </div>
          <p className="text-[15px] text-[#444748] max-w-md">
            Structured silhouettes and lightweight performance footwear built for enduring everyday expression.
          </p>
        </div>

        {/* Category Grid: Bento Asymmetrical */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Men Card (Col 7) */}
          <div
            onClick={() => handleDepartmentClick('Men')}
            className="group relative md:col-span-7 h-[420px] rounded-xl overflow-hidden shadow-sm bg-[#f3f3f3] flex flex-col justify-end p-8 cursor-pointer"
          >
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                alt="Men Collection"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh6CD8X2edVaC9ByduWvUoJGY-af1XrnllK_YuCWI1FOa0L4K0hLLOmW3fsaghtow0nnucfEQct_rMe0itsQ_qyKhmqGdYy1w0LcWjvW49TO2kqxS6S5a52glpJ1h9muUsoQpZkGrd20k6BTS6K7EEoJX1qq8lLy4DDWNGZS3q3noNUuKaExsg2OY3ABj7b9CauncdIqKYZQYTPO8f05nPtnGHMvJ4gfVb3JjR89uHbhWkWpBnv0sZ_w"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
            </div>
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#dce2f3] font-bold">
                Essential Series
              </span>
              <div className="flex items-center justify-between">
                <h3 className="font-headline text-[28px] font-bold uppercase tracking-tight">
                  Men
                </h3>
                <span className="material-symbols-outlined text-[24px] transform group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </div>
              <p className="text-[13px] text-[#dadada]">
                Tailored daily shirts, relaxed trousers, minimal sneakers
              </p>
            </div>
          </div>

          {/* Women Card (Col 5) */}
          <div
            onClick={() => handleDepartmentClick('Women')}
            className="group relative md:col-span-5 h-[420px] rounded-xl overflow-hidden shadow-sm bg-[#f3f3f3] flex flex-col justify-end p-8 cursor-pointer"
          >
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                alt="Women Collection"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAelG6jZbcCGsRHH6n4TrPImlgSPspi0v7CDs7aJkX39J5QTD23ohc3pvKzVbDBEE3Nnw1ScZeIoHj0p_3u2XkI4zxNZ_6qsLOiXpnglgmhrWeQKFqm8q9dPLqTdRwvWFPXCRq7JnGdFXinXSvkVvje42CICW4qvR3nS1iwjBnK844YzxxIgi--hoVgpgyZZrmW8It2hlTNrhCi59I_jy8F8LQYAwofZ2V9gE9c5Yf07AAMIEPw05GldA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
            </div>
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#dce2f3] font-bold">
                Modern Uniform
              </span>
              <div className="flex items-center justify-between">
                <h3 className="font-headline text-[28px] font-bold uppercase tracking-tight">
                  Women
                </h3>
                <span className="material-symbols-outlined text-[24px] transform group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </div>
              <p className="text-[13px] text-[#dadada]">
                Contemporary footwear, crisp linen, curated daily wear
              </p>
            </div>
          </div>

          {/* Shoes Card (Col 4) */}
          <div
            onClick={() => handleDepartmentClick('Shoes')}
            className="group relative md:col-span-4 h-[360px] rounded-xl overflow-hidden shadow-sm bg-[#f3f3f3] flex flex-col justify-end p-6 cursor-pointer"
          >
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                alt="Signature Soles"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB85NKr-E1oQgG6TBz1W7dOweXGCUw6e7ZSzNRbZ9xcO6DCmx3IUugNJcWLtu5CvxZjStTEtUE9ayqVd8tq3w8o7pE-gCLiMCTpUjtFKuAzZzFAMhuMTyjGRrLzEPsq0X4KVxv-5w-bDzIfG1Slh1t_SGDqaxpyYcSCUFfy0EKCt0kND-stmCCfrFiSOnmahtmNCwsKoPHNkcv4OOELRfVYu5-1T_NcWcpq2Rv8--tFVpPMcM7NzqNVjQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#dce2f3] font-bold">
                Signature Soles
              </span>
              <h3 className="font-headline text-[22px] font-bold uppercase tracking-tight">
                Shoes
              </h3>
              <p className="text-[13px] text-[#dadada]">
                Signature sneakers, dress loafers, sport runners
              </p>
            </div>
          </div>

          {/* Clothing Card (Col 4) */}
          <div
            onClick={() => handleDepartmentClick('Clothing')}
            className="group relative md:col-span-4 h-[360px] rounded-xl overflow-hidden shadow-sm bg-[#f3f3f3] flex flex-col justify-end p-6 cursor-pointer"
          >
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                alt="Apparel Engineering"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSCSMgDR6gLUzwNsR-tVHphMNLLssRWsaz5xvpA05lLZXU5mgO4RgYkj6ifAzpkP6P3l9V6JoVBaEGyB5agF11LiLiC9W0lcv6yOHLO-Wt-F8qupz24Bo_bSrxJdVikEVY8BSdHO4EywuOr2oeqkde88vQ0bb_EcLxC6E-qNtFDtdLLtFt8m0rY3gn5rtum2u19t7R3qeE1B4yYGs4Xw2v6ALy5-sNNknrwkAdCnYyZxVqV5mTE_MJVQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#dce2f3] font-bold">
                Apparel Engineering
              </span>
              <h3 className="font-headline text-[22px] font-bold uppercase tracking-tight">
                Clothing
              </h3>
              <p className="text-[13px] text-[#dadada]">
                Ultra-breathable tees, tailored denim &amp; chore coats
              </p>
            </div>
          </div>

          {/* Sneakers Card (Col 4) */}
          <div
            onClick={() => handleDepartmentClick('Sneakers')}
            className="group relative md:col-span-4 h-[360px] rounded-xl overflow-hidden shadow-sm bg-[#f3f3f3] flex flex-col justify-end p-6 cursor-pointer"
          >
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                alt="Performance Lab"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsjDreRJJCLZT-1txO_qXHwjGm-ydJt1V2fBbuzGilUcO1hnP7aVHUWvUKV8eKvx5vXkOy931uT94yu7Fky8MF3XgxuBURr8AEt_AAtka5OSMqv8TmupLod6lgh0eY-w5ic_mwWudf3OANM05PyRN0Y-za-nbYCMcixqHL0yvJV0iQaJzNsgn4SnUZ1Gszhum24UIucnJEnab41aBhIEOULA4nGBZ6I8R3bRpZeMzpmvOTdJjd51Yycg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#dce2f3] font-bold">
                Performance Lab
              </span>
              <h3 className="font-headline text-[22px] font-bold uppercase tracking-tight">
                Sneakers
              </h3>
              <p className="text-[13px] text-[#dadada]">
                Limited drops, classic retros, cloud foam trainers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SILHOUETTES (TABBED SHOWCASE) */}
      <section className="w-full bg-[#f3f3f3]/70 py-24" id="featured-shoes">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Header & Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#585f6c] block mb-1 font-bold">
                Precision Footwear
              </span>
              <h2 className="font-headline text-[32px] md:text-[42px] font-bold uppercase tracking-tight text-black">
                Featured Silhouettes
              </h2>
            </div>

            {/* Segmented Tab Controller */}
            <div className="inline-flex p-1.5 rounded-xl bg-[#e8e8e8] shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'all'
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-[#585f6c] hover:text-black font-semibold'
                }`}
              >
                Featured Footwear
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('new')}
                className={`px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'new'
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-[#585f6c] hover:text-black font-semibold'
                }`}
              >
                New Arrivals
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('trending')}
                className={`px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'trending'
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-[#585f6c] hover:text-black font-semibold'
                }`}
              >
                Trending Now
              </button>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSilhouettes.map(product => (
              <div
                key={product.id}
                className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  {/* Thumbnail & Overlays */}
                  <div className="relative w-full aspect-square rounded-lg bg-[#f3f3f3] overflow-hidden mb-4">
                    {product.badge && (
                      <span
                        className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                          product.badge === 'HOT'
                            ? 'bg-[#ba1a1a] text-white'
                            : product.badge === 'NEW'
                            ? 'bg-black text-white'
                            : 'bg-white/90 backdrop-blur-md text-black'
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors shadow-sm ${
                        isWishlisted(product.id) ? 'text-red-600' : 'text-gray-700'
                      }`}
                      type="button"
                      aria-label="Wishlist"
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isWishlisted(product.id) ? 'fill-1 text-red-600' : ''
                        }`}
                      >
                        favorite
                      </span>
                    </button>

                    <img
                      onClick={() => navigateTo('pdp', product.id)}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
                      alt={product.title}
                      src={product.heroImage}
                    />

                    {/* Quick Add Size Reveal Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-white/95 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-2">
                      <span className="text-[10px] text-[#585f6c] uppercase font-semibold">
                        Select UK Size
                      </span>
                      <div className="grid grid-cols-5 gap-1 text-center text-xs font-semibold">
                        {['7', '8', '9', '10', '11'].map(sz => (
                          <button
                            key={sz}
                            onClick={() => {
                              addToCart(product, `UK ${sz}`, product.colors[0]?.name || 'Standard');
                            }}
                            type="button"
                            className="py-1 rounded bg-[#eeeeee] hover:bg-black hover:text-white transition-colors"
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Product Specs */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-[#585f6c]">
                      <div className="flex items-center text-amber-600">
                        <span className="material-symbols-outlined text-[15px] fill-1">star</span>
                        <span className="font-bold text-black ml-1">{product.rating}</span>
                      </div>
                      <span>•</span>
                      <span className="text-[#444748]">{product.reviewsCount} reviews</span>
                    </div>

                    <h3
                      onClick={() => navigateTo('pdp', product.id)}
                      className="font-headline text-[18px] leading-tight font-bold text-black group-hover:text-gray-700 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.title}
                    </h3>
                    <p className="text-[13px] text-[#444748] truncate">{product.subtitle}</p>
                  </div>
                </div>

                {/* Color Swatches & Price / CTA */}
                <div className="pt-4 mt-2 border-t border-gray-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {product.colors.map((c, idx) => (
                        <span
                          key={c.name}
                          style={{ backgroundColor: c.hex }}
                          className={`w-3.5 h-3.5 rounded-full inline-block border border-gray-300 ${
                            idx === 0 ? 'ring-1 ring-black' : ''
                          }`}
                          title={c.name}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#585f6c] font-medium">
                      +{product.colors.length} tones
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-headline text-[20px] font-bold text-black">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs line-through text-[#747878]">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                        {product.discountBadge}
                      </span>
                    </div>

                    <button
                      onClick={() => openSizeModal(product)}
                      className="p-2.5 rounded-lg bg-[#eeeeee] hover:bg-black hover:text-white text-black transition-all"
                      type="button"
                      title="Select Size & Add to Bag"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        add_shopping_cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DAILY WEAR SPOTLIGHT (SPLIT EDITORIAL BANNER) */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-24" id="clothing">
        <div className="bg-[#000000] rounded-2xl overflow-hidden text-white grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          {/* Story Column (Left 7 Cols) */}
          <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#dce2f3] text-[10px] font-semibold uppercase tracking-widest">
                Uniform Capsule #04
              </div>

              <h2 className="font-display text-[38px] md:text-[56px] leading-[1.08] font-bold uppercase tracking-tight">
                Everyday Style.<br />
                <span className="text-[#dce2f3] font-light lowercase italic font-body text-[44px] md:text-[62px]">
                  everyday
                </span>{' '}
                Comfort.
              </h2>

              <p className="text-[16px] md:text-[18px] text-[#e8e8e8] max-w-xl leading-relaxed">
                Engineered for workdays that seamlessly turn into evenings out. Wrinkle-resistant Supima cotton shirts, 4-way stretch tailored chinos, and architecturally cushioned everyday soles.
              </p>

              {/* Bullet Features */}
              <div className="grid grid-cols-2 gap-4 pt-4 text-[#dadada] text-[13px]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#dce2f3] text-[20px]">
                    check_circle
                  </span>
                  <span>Ultra-soft Supima Cotton</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#dce2f3] text-[20px]">
                    check_circle
                  </span>
                  <span>360° Flexible Mobility</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#dce2f3] text-[20px]">
                    check_circle
                  </span>
                  <span>Thermoregulating Fabric</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#dce2f3] text-[20px]">
                    check_circle
                  </span>
                  <span>Machine Wash &amp; Wear</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigateTo('catalog')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-lg hover:-translate-y-0.5"
                type="button"
              >
                <span>Shop Daily Wear</span>
                <span className="material-symbols-outlined text-[18px]">east</span>
              </button>
            </div>
          </div>

          {/* Quick-Shop Bundle Preview (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-white/5 p-8 md:p-12 flex flex-col justify-between backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white/10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/15 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#dce2f3] font-bold">
                    Curated Set
                  </span>
                  <h3 className="font-headline text-[22px] uppercase font-bold text-white">
                    The Weekday Uniform
                  </h3>
                </div>
                <span className="px-3 py-1 rounded bg-[#497cff]/30 text-[#dce2f3] text-[10px] uppercase font-bold">
                  Save 15%
                </span>
              </div>

              {/* Bundle Items Stack */}
              <div className="space-y-4">
                {/* Item 1 */}
                <div className="flex items-center gap-4 bg-white/10 p-3 rounded-xl">
                  <div className="w-16 h-16 rounded-lg bg-gray-900 shrink-0 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Crisp Oxford Supima Shirt"
                      src={APPAREL_ITEMS[1].image}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">
                      Crisp Oxford Supima Shirt
                    </h4>
                    <p className="text-xs text-[#dadada]">Eggshell White • Relaxed Fit</p>
                    <span className="text-xs font-semibold text-[#dce2f3]">₹1,899</span>
                  </div>
                  <span className="material-symbols-outlined text-[#dce2f3]">add</span>
                </div>

                {/* Item 2 */}
                <div className="flex items-center gap-4 bg-white/10 p-3 rounded-xl">
                  <div className="w-16 h-16 rounded-lg bg-gray-900 shrink-0 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Architect Tapered Chinos"
                      src={APPAREL_ITEMS[2].image}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">
                      Architect Tapered Chinos
                    </h4>
                    <p className="text-xs text-[#dadada]">Muted Olive • Comfort Waist</p>
                    <span className="text-xs font-semibold text-[#dce2f3]">₹2,199</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#dadada]">Bundle Combined Value</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-[22px] font-bold text-white">₹3,480</span>
                  <span className="line-through text-gray-400 text-xs">₹4,098</span>
                </div>
              </div>

              <button
                onClick={handleAddBundle}
                className="w-full py-3.5 bg-white text-black rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Add Complete Bundle to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS VAULT */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#585f6c] block mb-1 font-bold">
              Community Revered
            </span>
            <h2 className="font-headline text-[32px] md:text-[42px] font-bold tracking-tight text-black uppercase">
              Best Sellers Vault
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Scrolling vault carousel')}
              className="w-10 h-10 rounded-full bg-[#eeeeee] hover:bg-[#e2e2e2] transition-colors flex items-center justify-center text-black"
              type="button"
              aria-label="Previous"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button
              onClick={() => showToast('Scrolling vault carousel')}
              className="w-10 h-10 rounded-full bg-[#eeeeee] hover:bg-[#e2e2e2] transition-colors flex items-center justify-center text-black"
              type="button"
              aria-label="Next"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* 3-Column Best Sellers Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Item 1: Monochrome Heritage Low */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative w-full aspect-[4/3] rounded-lg bg-[#f3f3f3] overflow-hidden mb-6">
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded bg-black text-white text-[10px] font-bold uppercase tracking-wider">
                #1 IN FOOTWEAR
              </span>
              <img
                onClick={() => navigateTo('pdp', 'monochrome-heritage')}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500 cursor-pointer"
                alt="Monochrome Heritage Low"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVMB7SDmg3N13zpljqsMVqRSQQYudN21UYtXkxb8wCCBKTGbKeKyJ4u-OLx1uN0WYZSYEi-7YloNPOYB2yYecNHwZDNeS9yndxxFWk8icXF_kpavQqeH4Hr4OycAZCaniPaCJA0P01YxL7uWFUN_ZAOKwQh9weTEbbHIiVmKeIR2VNDiMHwZLR2VbQzm219iBPWIW0kjMtXsOe72_dV-ND0-Hkn-Tx7AkWLgMezehp0kQybPTEMhYOkQ"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-amber-600 gap-1 text-[11px]">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="material-symbols-outlined text-[16px] fill-1">
                      star
                    </span>
                  ))}
                  <span className="text-black font-bold ml-1">4.95</span>
                </div>
                <span className="text-[10px] text-[#585f6c] font-medium">620+ Verified Buyers</span>
              </div>

              <h3
                onClick={() => navigateTo('pdp', 'monochrome-heritage')}
                className="font-headline text-[20px] font-bold text-black cursor-pointer hover:text-gray-700"
              >
                Monochrome Heritage Low
              </h3>
              <p className="text-[13px] text-[#444748]">
                Arch-support insole wrapped in breathable nappa calfskin.
              </p>

              {/* Instant Size Choice UK */}
              <div className="pt-2">
                <span className="text-[10px] text-[#585f6c] uppercase font-semibold block mb-2">
                  Instant Size Choice (UK)
                </span>
                <div className="flex items-center gap-2">
                  {['7', '8', '9', '10', '11'].map(sz => (
                    <button
                      key={sz}
                      onClick={() => handleVaultSizeSelect('monochrome-heritage', `UK ${sz}`)}
                      type="button"
                      className={`w-10 h-10 rounded-lg text-xs font-bold transition-all ${
                        selectedVaultSizes['monochrome-heritage'] === `UK ${sz}`
                          ? 'bg-black text-white shadow-sm'
                          : 'bg-[#eeeeee] hover:bg-black hover:text-white text-gray-800'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-[22px] font-bold text-black">₹2,799</span>
                  <span className="text-xs line-through text-[#747878]">₹3,699</span>
                </div>
                <button
                  onClick={() => {
                    const prod = PRODUCTS.find(p => p.id === 'monochrome-heritage') || PRODUCTS[4];
                    addToCart(prod, selectedVaultSizes['monochrome-heritage'] || 'UK 8', prod.colors[0]?.name || 'Standard');
                  }}
                  className="px-5 py-2.5 bg-black text-white hover:bg-neutral-800 transition-colors rounded-lg text-xs uppercase tracking-wider font-bold"
                  type="button"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>

          {/* Item 2: Heavy Linen Field Overshirt */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative w-full aspect-[4/3] rounded-lg bg-[#f3f3f3] overflow-hidden mb-6">
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded bg-black text-white text-[10px] font-bold uppercase tracking-wider">
                ESSENTIAL FIT
              </span>
              <img
                onClick={() => navigateTo('catalog')}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500 cursor-pointer"
                alt="Heavy Linen Field Overshirt"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_ahABbMfk1Z2sCLgeav1-gnxUs6Xz4rqSV918uIYu5t2eXPo-CFTmqnjvib3OUtjyHPhWz8RRIrFjWHS6z7nnhv_0SiyuMQSsFa3d8pl9lfLo7n5fb9QWUzbneIfjxU4iSlN-1mfmR-xS9qqHhqoEBIVI8jZIia5cyDentZ7MPRkRJHCdT3TSp5l3OaB4SES4vdgoLzTftCfRf_M_6JbXf6pVHaGFkfG7I3QHAm-RzbxRO4KKJfXMgw"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-amber-600 gap-1 text-[11px]">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="material-symbols-outlined text-[16px] fill-1">
                      star
                    </span>
                  ))}
                  <span className="text-black font-bold ml-1">4.88</span>
                </div>
                <span className="text-[10px] text-[#585f6c] font-medium">380+ Verified Buyers</span>
              </div>

              <h3 className="font-headline text-[20px] font-bold text-black">
                Heavy Linen Field Overshirt
              </h3>
              <p className="text-[13px] text-[#444748]">
                Structured drape, pre-washed for zero shrinkage and maximum breathability.
              </p>

              <div className="pt-2">
                <span className="text-[10px] text-[#585f6c] uppercase font-semibold block mb-2">
                  Size Selection
                </span>
                <div className="flex items-center gap-2">
                  {['S', 'M', 'L', 'XL'].map(sz => (
                    <button
                      key={sz}
                      onClick={() => handleVaultSizeSelect('heavy-linen-field-overshirt', sz)}
                      type="button"
                      className={`w-10 h-10 rounded-lg text-xs font-bold transition-all ${
                        selectedVaultSizes['heavy-linen-field-overshirt'] === sz
                          ? 'bg-black text-white shadow-sm'
                          : 'bg-[#eeeeee] hover:bg-black hover:text-white text-gray-800'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-[22px] font-bold text-black">₹2,199</span>
                  <span className="text-xs line-through text-[#747878]">₹2,899</span>
                </div>
                <button
                  onClick={() => {
                    addApparelOrKitToCart(
                      'Heavy Linen Field Overshirt',
                      2199,
                      2899,
                      APPAREL_ITEMS[0].image,
                      selectedVaultSizes['heavy-linen-field-overshirt'] || 'M',
                      'Olive Moss'
                    );
                  }}
                  className="px-5 py-2.5 bg-black text-white hover:bg-neutral-800 transition-colors rounded-lg text-xs uppercase tracking-wider font-bold"
                  type="button"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>

          {/* Item 3: Strata Perforated Slip-On */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative w-full aspect-[4/3] rounded-lg bg-[#f3f3f3] overflow-hidden mb-6">
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded bg-black text-white text-[10px] font-bold uppercase tracking-wider">
                ALL-DAY COMFORT
              </span>
              <img
                onClick={() => navigateTo('pdp', 'strata-slip-on')}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500 cursor-pointer"
                alt="Strata Perforated Slip-On"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4TXsBnMO_UWTHJ5NulZFiDTf6isA74MtmVj6QdVOOG1BjJXDblwRBFSRWQNNQxIs21HacIzOcvA_5NZh7TZxMgKYBRqHdy7rDNiJWeXhYgu5fmQGGn9ZebKYFkQMf-I2HDx525c5VoV-tG7Tx9ZEZQcEFJ2gWaTs0GJqioq4xJDj7_OiGeOpGXvlnGDu2Es9rokBbcu_m2V4Oj0leo_CGHLWsOLvY0awLl3m_6wg2wVD3UgxyCkn1Ww"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-amber-600 gap-1 text-[11px]">
                  {[1, 2, 3, 4].map(i => (
                    <span key={i} className="material-symbols-outlined text-[16px] fill-1">
                      star
                    </span>
                  ))}
                  <span className="material-symbols-outlined text-[16px]">star_half</span>
                  <span className="text-black font-bold ml-1">4.79</span>
                </div>
                <span className="text-[10px] text-[#585f6c] font-medium">240+ Verified Buyers</span>
              </div>

              <h3
                onClick={() => navigateTo('pdp', 'strata-slip-on')}
                className="font-headline text-[20px] font-bold text-black cursor-pointer hover:text-gray-700"
              >
                Strata Perforated Slip-On
              </h3>
              <p className="text-[13px] text-[#444748]">
                Elasticated collar with memory cushioning for effortless transit.
              </p>

              <div className="pt-2">
                <span className="text-[10px] text-[#585f6c] uppercase font-semibold block mb-2">
                  Instant Size Choice (UK)
                </span>
                <div className="flex items-center gap-2">
                  {['7', '8', '9', '10', '11'].map(sz => (
                    <button
                      key={sz}
                      onClick={() => handleVaultSizeSelect('strata-slip-on', `UK ${sz}`)}
                      type="button"
                      className={`w-10 h-10 rounded-lg text-xs font-bold transition-all ${
                        selectedVaultSizes['strata-slip-on'] === `UK ${sz}`
                          ? 'bg-black text-white shadow-sm'
                          : 'bg-[#eeeeee] hover:bg-black hover:text-white text-gray-800'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-[22px] font-bold text-black">₹2,899</span>
                  <span className="text-xs line-through text-[#747878]">₹3,999</span>
                </div>
                <button
                  onClick={() => {
                    const prod = PRODUCTS.find(p => p.id === 'strata-slip-on') || PRODUCTS[5];
                    addToCart(prod, selectedVaultSizes['strata-slip-on'] || 'UK 9', prod.colors[0]?.name || 'Standard');
                  }}
                  className="px-5 py-2.5 bg-black text-white hover:bg-neutral-800 transition-colors rounded-lg text-xs uppercase tracking-wider font-bold"
                  type="button"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VALUE PROPOSITION & TRUST BAR */}
      <section className="w-full bg-[#eeeeee] py-16">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">local_shipping</span>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-black">
                  Free Express Shipping
                </h4>
                <p className="text-[13px] text-[#444748] mt-1">
                  Complimentary dispatch across India on all orders over ₹999.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">
                  published_with_changes
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-black">
                  7-Day Instant Returns
                </h4>
                <p className="text-[13px] text-[#444748] mt-1">
                  Seamless doorstep pickup and immediate refund initiation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-black">
                  100% Certified Authentic
                </h4>
                <p className="text-[13px] text-[#444748] mt-1">
                  Ethically sourced materials and precision artisan craftsmanship.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">support_agent</span>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-black">
                  24/7 Dedicated Support
                </h4>
                <p className="text-[13px] text-[#444748] mt-1">
                  Direct priority WhatsApp sizing &amp; concierge order assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EDITORIAL REVIEWS & SOCIAL PROOF */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-widest text-[#585f6c] font-bold">
            Tested in the Wild
          </span>
          <h2 className="font-headline text-[32px] md:text-[42px] font-bold uppercase tracking-tight text-black">
            The STEPSTYLE Verdict
          </h2>
          <p className="text-[15px] text-[#444748]">
            Over 48,000 discerning urbanites who made the shift to disciplined footwear and quiet daily apparel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center text-amber-600 gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="material-symbols-outlined text-[18px] fill-1">
                    star
                  </span>
                ))}
              </div>
              <p className="text-[15px] leading-relaxed text-[#1a1c1c] font-normal">
                “I took the Classic Minimalist sneakers straight to a 4-day design conference in Mumbai—clocked 18,000 steps daily without a single blister. They match tailored trousers just as effortlessly as selvedge denim.”
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide text-black">
                  Aakash Mehta
                </h4>
                <span className="text-[12px] text-[#585f6c]">Architect &amp; Creative Director</span>
              </div>
              <span className="px-2 py-1 rounded bg-[#eeeeee] text-[10px] text-black font-semibold">
                Verified Buyer
              </span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center text-amber-600 gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="material-symbols-outlined text-[18px] fill-1">
                    star
                  </span>
                ))}
              </div>
              <p className="text-[15px] leading-relaxed text-[#1a1c1c] font-normal">
                “The drape of the linen shirt is sublime. It doesn’t billow like generic linen; there’s a real architectural weight to the textile. Customer service swapped my shoe size within 24 hours without asking ten questions.”
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide text-black">
                  Kavya Singhania
                </h4>
                <span className="text-[12px] text-[#585f6c]">Brand Strategist</span>
              </div>
              <span className="px-2 py-1 rounded bg-[#eeeeee] text-[10px] text-black font-semibold">
                Verified Buyer
              </span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center text-amber-600 gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="material-symbols-outlined text-[18px] fill-1">
                    star
                  </span>
                ))}
              </div>
              <p className="text-[15px] leading-relaxed text-[#1a1c1c] font-normal">
                “The Urban Drift foam slides are hands down the best recovery footwear I’ve owned. The footbed geometry supports high arches naturally. Truly elevated everyday luxury at an accessible price point.”
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide text-black">
                  Rohan Chawla
                </h4>
                <span className="text-[12px] text-[#585f6c]">Product Lead</span>
              </div>
              <span className="px-2 py-1 rounded bg-[#eeeeee] text-[10px] text-black font-semibold">
                Verified Buyer
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
