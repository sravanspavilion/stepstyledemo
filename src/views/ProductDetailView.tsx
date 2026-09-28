import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, APPAREL_ITEMS, RECENTLY_EXPLORED } from '../data/products';
import { CheckoutModal } from '../components/CheckoutModal';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProductId,
    navigateTo,
    addToCart,
    addApparelOrKitToCart,
    toggleWishlist,
    isWishlisted,
    openSizeModal,
    showToast
  } = useStore();

  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Chalk White / Natural Gum');
  const [selectedSize, setSelectedSize] = useState('UK 9');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'care' | 'reviews'>('specs');
  
  // Pincode checker state
  const [pincode, setPincode] = useState('400001');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [pincodeCity, setPincodeCity] = useState('Mumbai');
  
  // Add to bag button state
  const [isAdding, setIsAdding] = useState(false);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // 1-Click checkout modal
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Use gallery image or fallback to hero image
  const displayImage = product.galleryImages[activeImageIndex]?.url || product.heroImage;

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && !isNaN(Number(pincode))) {
      setPincodeChecked(true);
      if (pincode.startsWith('11')) setPincodeCity('New Delhi');
      else if (pincode.startsWith('56')) setPincodeCity('Bengaluru');
      else if (pincode.startsWith('50')) setPincodeCity('Hyderabad');
      else setPincodeCity('Mumbai');
      showToast(`Delivery available for ${pincode}`);
    } else {
      showToast('Please enter a valid 6-digit postal pincode');
    }
  };

  const handleAddToBag = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setIsAddedSuccess(true);
      addToCart(product, selectedSize, selectedColor, quantity);
      setTimeout(() => {
        setIsAddedSuccess(false);
      }, 1800);
    }, 400);
  };

  const handleAddBundleToBag = () => {
    addToCart(product, selectedSize, selectedColor, 1);
    addApparelOrKitToCart(
      'Heavy Linen Field Overshirt',
      1899,
      2499,
      APPAREL_ITEMS[0].image,
      'Medium (True Fit)',
      'Natural Sandstone'
    );
    addApparelOrKitToCart(
      'Architect Tapered Chinos',
      1599,
      1999,
      APPAREL_ITEMS[2].image,
      '32 / 30',
      'Olive Drab'
    );
    showToast('Complete 3-piece uniform look added to bag (Saved ₹800)!');
  };

  const unitPrice = product.price;
  const totalPrice = unitPrice * quantity;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Top Breadcrumb & Live Production Strip */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 py-3 flex items-center justify-between text-xs uppercase tracking-wider text-[#444748] border-b border-gray-100">
        <nav className="flex items-center gap-1.5 flex-wrap">
          <button onClick={() => navigateTo('home')} className="hover:text-black transition-colors">
            Home
          </button>
          <span className="text-gray-300">/</span>
          <button onClick={() => navigateTo('catalog')} className="hover:text-black transition-colors">
            Men
          </button>
          <span className="text-gray-300">/</span>
          <button onClick={() => navigateTo('catalog')} className="hover:text-black transition-colors">
            Shoes
          </button>
          <span className="text-gray-300">/</span>
          <button onClick={() => navigateTo('catalog')} className="hover:text-black transition-colors">
            Sneakers
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-black font-bold truncate max-w-[200px] md:max-w-none">
            {product.title}
          </span>
        </nav>

        <div className="hidden md:flex items-center gap-2 text-[10px] bg-[#eeeeee] px-3 py-1 rounded-full text-black font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>Live Production Batch: Spring Edition</span>
        </div>
      </div>

      {/* 2. Primary Showcase 2-Column Desktop Grid */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 pt-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          {/* LEFT COLUMN: Dynamic Media Showcase (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Main Focal Hero Display Container */}
            <div className="relative w-full aspect-[4/3] md:aspect-[16/11] bg-[#f3f3f3] rounded-xl overflow-hidden shadow-sm group">
              <img
                alt={product.title}
                className="w-full h-full object-cover object-center transition-all duration-500 scale-100 group-hover:scale-105"
                src={displayImage}
              />

              {/* Badges & Overlays */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md text-black text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-black"></span>
                  Italian Sole Tech
                </span>
                <span className="px-3 py-1 rounded-lg bg-black text-white text-[10px] uppercase tracking-wider shadow-sm w-fit font-bold">
                  Bestseller #1
                </span>
              </div>

              {/* Utility Badges (Top Right) */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-md transition-all flex items-center justify-center shadow-sm ${
                    isWishlisted(product.id) ? 'text-red-600' : 'text-black hover:text-red-600'
                  }`}
                  title="Save to Wishlist"
                  type="button"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isWishlisted(product.id) ? 'fill-1 text-red-600' : ''
                    }`}
                  >
                    favorite
                  </span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast('Link copied to clipboard');
                  }}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-black hover:bg-black hover:text-white transition-all flex items-center justify-center shadow-sm"
                  title="Share Silhouette"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
              </div>

              {/* Interactive 360 & Zoom Affordances */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                <button
                  type="button"
                  onClick={() => showToast('360° interactive turntable view active')}
                  className="pointer-events-auto cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-wider text-black shadow-sm hover:bg-black hover:text-white transition-colors font-bold"
                >
                  <span className="material-symbols-outlined text-[16px]">360</span>
                  360° Interactive View
                </button>
                <span className="pointer-events-auto hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] text-[#444748] shadow-sm font-semibold">
                  <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                  Hover to Zoom
                </span>
              </div>
            </div>

            {/* 5-Angle Thumbnail Rail */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {product.galleryImages.map((thumb, idx) => (
                <button
                  key={thumb.label}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`group relative aspect-square rounded-lg overflow-hidden bg-[#eeeeee] p-0.5 transition-all shadow-sm ${
                    activeImageIndex === idx
                      ? 'ring-2 ring-black'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                  type="button"
                >
                  <img
                    alt={thumb.label}
                    className="w-full h-full object-cover rounded-md group-hover:opacity-90"
                    src={thumb.url}
                  />
                  <span className="absolute bottom-1 inset-x-1 text-[9px] uppercase tracking-tight text-center bg-white/80 py-0.5 rounded backdrop-blur-sm text-black truncate hidden sm:block font-bold">
                    {thumb.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Editorial Lookbook Banner: 'How to Style This Silhouette' */}
            <div className="mt-4 p-6 rounded-xl bg-[#f3f3f3] shadow-sm flex flex-col md:flex-row gap-6 items-center border border-gray-100">
              <div className="w-full md:w-5/12 aspect-[3/4] rounded-lg overflow-hidden shrink-0 shadow-sm">
                <img
                  alt="Styling Guide Model"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGPcByMlE1XE3W0i1dbUT9MiSHEdKko6QjPLDpRu5hSfXFlzF5bS1n0nbOW03aoN7boH7leZPFJ_zBnqhi4qkNlPC2kfD-vuaRdEGZwx_D5adMr9Nl9rJ5jkskOhTCyzDR0PjDaSonKRPM1yu-98gEfGx8lomIqrEIMb-0HlYHn5iDob_-XS7QVQHiqfxC9B8LGU2Mz-udDmCnaY_3_5c6sDX0VApCY96-5UaSL8OxG9WKZfuApM2EyQ"
                />
              </div>
              <div className="flex flex-col justify-center space-y-3 w-full md:w-7/12">
                <span className="text-[10px] uppercase tracking-widest text-[#444748] font-bold">
                  Editorial Lookbook • Vol. 04
                </span>
                <h3 className="font-headline text-[22px] text-black font-bold">
                  How to Style This Silhouette
                </h3>
                <p className="text-[13px] text-[#444748] leading-relaxed">
                  Designed with an ultra-clean toe box and disciplined profile. Pairs seamlessly with tapered pleated chinos for desk hours, or raw denim and washed linen overshirts for weekend escapades.
                </p>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="px-2.5 py-1 rounded bg-white text-[10px] text-black font-semibold shadow-sm">
                    Smart Casual
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white text-[10px] text-black font-semibold shadow-sm">
                    Tapered Fit
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white text-[10px] text-black font-semibold shadow-sm">
                    Monochrome Uniform
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Product Purchase Matrix (5 Columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-5 bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
            {/* SKU & Category Tag */}
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#444748]">
              <span className="font-bold text-black">PERFORMANCE ESSENTIALS</span>
              <span className="font-mono text-gray-400">SKU: {product.sku}</span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h1 className="font-headline text-[26px] md:text-[30px] font-bold text-black tracking-tight leading-tight">
                {product.title}
              </h1>
              <p className="text-[14px] text-[#444748]">{product.subtitle}</p>
            </div>

            {/* Rating & Social Proof */}
            <div className="flex items-center gap-3 py-1 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-1 bg-[#f3f3f3] px-2.5 py-1 rounded-md">
                <span className="text-xs font-bold text-black">{product.rating}</span>
                <div className="flex text-amber-500 text-[14px]">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="material-symbols-outlined text-[16px] fill-1">
                      star
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setActiveTab('reviews')}
                className="text-[11px] underline text-[#444748] hover:text-black font-medium"
              >
                {product.reviewsCount} verified buyer reviews
              </button>
              <span className="text-gray-300">•</span>
              <span className="text-[11px] text-emerald-800 font-semibold">98% recommend fit</span>
            </div>

            {/* Pricing */}
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-3">
                <span className="font-headline text-[32px] font-bold text-black tracking-tight">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-[20px] text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase">
                  {product.discountBadge}
                </span>
              </div>
              <span className="text-[11px] text-[#444748]">
                Inclusive of all taxes. Free Express Shipping across India.
              </span>
            </div>

            {/* Colorway Selector */}
            <div className="space-y-2 pt-1 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider font-bold text-black">Colorway:</span>
                <span className="text-black font-bold">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-9 h-9 rounded-full relative shadow-sm transition-transform active:scale-95 border border-gray-300 ${
                      selectedColor === c.name
                        ? 'ring-2 ring-black ring-offset-2'
                        : 'hover:ring-1 hover:ring-gray-400'
                    }`}
                    title={c.name}
                    type="button"
                  >
                    {c.subHex && (
                      <span
                        style={{ backgroundColor: c.subHex }}
                        className="absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection Grid */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider font-bold text-black">
                  Select Footwear Size (UK / India):
                </span>
                <button
                  onClick={() => openSizeModal(product)}
                  className="inline-flex items-center gap-1 text-black underline hover:opacity-80 font-bold transition-opacity"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">straighten</span>
                  Size &amp; Fit Guide
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 pt-1">
                {['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'].map(sz => {
                  const isOOS = sz === 'UK 12';
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      disabled={isOOS}
                      onClick={() => setSelectedSize(sz)}
                      type="button"
                      className={`py-2.5 rounded-lg text-xs font-semibold text-center flex flex-col items-center justify-center transition-all ${
                        isOOS
                          ? 'bg-[#f3f3f3] text-gray-300 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-black text-white ring-2 ring-black shadow-sm font-bold'
                          : 'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-black'
                      }`}
                    >
                      <span>{sz}</span>
                      {sz === 'UK 6' && (
                        <span className="text-[9px] text-amber-700 leading-none mt-0.5">2 left</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Fit note */}
              <div className="flex items-center gap-2 text-[11px] text-[#444748] bg-[#f3f3f3] px-3 py-2 rounded-lg">
                <span className="material-symbols-outlined text-[16px] text-black">check_circle</span>
                <span>
                  <strong>True to size.</strong> If you measure between sizes, we recommend selecting one half-size up.
                </span>
              </div>
            </div>

            {/* Quantity Stepper & High Demand Badge */}
            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="flex items-center bg-[#f3f3f3] rounded-lg p-1">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-200 rounded transition-colors"
                  type="button"
                  aria-label="Decrease quantity"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span className="w-8 text-center text-xs font-bold text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
                  className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-200 rounded transition-colors"
                  type="button"
                  aria-label="Increase quantity"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-amber-900 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                <span className="material-symbols-outlined text-[16px] text-amber-600">
                  local_fire_department
                </span>
                <span>
                  <strong>High Demand:</strong> 34 people viewed in past hour
                </span>
              </div>
            </div>

            {/* CTAs Stack */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleAddToBag}
                disabled={isAdding}
                className="w-full py-4 px-6 rounded-xl bg-black text-white hover:bg-neutral-800 transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
                type="button"
              >
                {isAdding ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                    <span>ADDING TO BAG...</span>
                  </>
                ) : isAddedSuccess ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] text-emerald-400">check_circle</span>
                    <span>ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                    <span>ADD TO BAG • ₹{totalPrice.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  addToCart(product, selectedSize, selectedColor, quantity);
                  setCheckoutModalOpen(true);
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-[#eeeeee] text-black hover:bg-[#e2e2e2] transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.99]"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">flash_on</span>
                <span>BUY NOW WITH 1-CLICK CHECKOUT</span>
              </button>
            </div>

            {/* Pincode Checker */}
            <div className="bg-[#f3f3f3] p-3.5 rounded-xl space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-black font-bold block">
                Check Estimated Delivery &amp; COD:
              </span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="w-full px-3 py-2 text-xs bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-neutral-800 transition-colors shrink-0"
                >
                  Check
                </button>
              </form>

              {pincodeChecked && (
                <div className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">
                    local_shipping
                  </span>
                  <span>
                    Delivering to <strong>{pincode} ({pincodeCity})</strong> by <strong>Friday, 28 Feb</strong> • FREE Delivery
                  </span>
                </div>
              )}
            </div>

            {/* Service Guarantees Accordion */}
            <div className="space-y-1.5 pt-1 text-xs">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-[#f3f3f3]/60">
                <span className="material-symbols-outlined text-[20px] text-black">rocket_launch</span>
                <div>
                  <span className="font-bold text-black block">Free Express Shipping</span>
                  <span className="text-[#444748] text-[10px]">
                    Dispatched within 24 hours. Delivered in 2-4 business days.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-lg bg-[#f3f3f3]/60">
                <span className="material-symbols-outlined text-[20px] text-black">
                  published_with_changes
                </span>
                <div>
                  <span className="font-bold text-black block">7-Day Doorstep Exchange &amp; Returns</span>
                  <span className="text-[#444748] text-[10px]">
                    Hassle-free size swaps with complimentary doorstep pickup.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-lg bg-[#f3f3f3]/60">
                <span className="material-symbols-outlined text-[20px] text-black">verified_user</span>
                <div>
                  <span className="font-bold text-black block">100% Certified Authentic &amp; Handcrafted</span>
                  <span className="text-[#444748] text-[10px]">
                    Engineered with ethically audited tannery certs and durable cupsole.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Deep Dive Product Information Tabs */}
      <div className="w-full bg-[#f3f3f3] py-16">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 space-y-8">
          {/* Tab Navigation */}
          <div className="flex items-center gap-6 overflow-x-auto pb-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('specs')}
              className={`font-headline text-[18px] md:text-[22px] font-bold pb-2 shrink-0 transition-colors ${
                activeTab === 'specs'
                  ? 'text-black border-b-2 border-black'
                  : 'text-[#444748] hover:text-black'
              }`}
              type="button"
            >
              Engineering &amp; Specs
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`font-headline text-[18px] md:text-[22px] font-bold pb-2 shrink-0 transition-colors ${
                activeTab === 'care'
                  ? 'text-black border-b-2 border-black'
                  : 'text-[#444748] hover:text-black'
              }`}
              type="button"
            >
              Leather Care Protocol
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`font-headline text-[18px] md:text-[22px] font-bold pb-2 shrink-0 transition-colors ${
                activeTab === 'reviews'
                  ? 'text-black border-b-2 border-black'
                  : 'text-[#444748] hover:text-black'
              }`}
              type="button"
            >
              Buyer Feedback ({product.reviewsCount})
            </button>
          </div>

          {/* Tab Content 1: Specs */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl bg-white shadow-sm space-y-2 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-[#f3f3f3] flex items-center justify-center text-black mb-3">
                  <span className="material-symbols-outlined text-[24px]">layers</span>
                </div>
                <h4 className="text-sm font-bold text-black">Italian Nappa Upper</h4>
                <p className="text-[13px] text-[#444748] leading-relaxed">
                  Sourced from family-run tanneries in Arzignano. Ultra-soft full grain temper that conforms to natural foot kinetics over time without deep creasing.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white shadow-sm space-y-2 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-[#f3f3f3] flex items-center justify-center text-black mb-3">
                  <span className="material-symbols-outlined text-[24px]">footprint</span>
                </div>
                <h4 className="text-sm font-bold text-black">Ortho-Density Insole</h4>
                <p className="text-[13px] text-[#444748] leading-relaxed">
                  Removable dual-density recycled PU footbed with micro-perforated leather top layer. Built for all-day 15,000+ step shock absorption.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white shadow-sm space-y-2 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-[#f3f3f3] flex items-center justify-center text-black mb-3">
                  <span className="material-symbols-outlined text-[24px]">anchor</span>
                </div>
                <h4 className="text-sm font-bold text-black">Vulcanized Gum Cupsole</h4>
                <p className="text-[13px] text-[#444748] leading-relaxed">
                  360-degree lock-stitch sidewall construction connecting upper directly to natural gum sole. Eliminates delamination risks common with glued sneakers.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white shadow-sm space-y-2 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-[#f3f3f3] flex items-center justify-center text-black mb-3">
                  <span className="material-symbols-outlined text-[24px]">clean_hands</span>
                </div>
                <h4 className="text-sm font-bold text-black">Antimicrobial Interior</h4>
                <p className="text-[13px] text-[#444748] leading-relaxed">
                  Lined with silky-soft calfskin and treated with plant-derived silver ion solution for natural odor neutrality even without socks.
                </p>
              </div>
            </div>
          )}

          {/* Tab Content 2: Care Protocol */}
          {activeTab === 'care' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-white shadow-sm space-y-2 border border-gray-100">
                <span className="text-[10px] font-mono text-gray-400 font-bold">STEP 01</span>
                <h4 className="text-sm font-bold text-black">Dry Dust &amp; Debris Wipe</h4>
                <p className="text-[13px] text-[#444748] leading-relaxed">
                  Use a soft horsehair brush to sweep away loose dirt along the welt and tongue seams after wear.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white shadow-sm space-y-2 border border-gray-100">
                <span className="text-[10px] font-mono text-gray-400 font-bold">STEP 02</span>
                <h4 className="text-sm font-bold text-black">Natural Leather Balm</h4>
                <p className="text-[13px] text-[#444748] leading-relaxed">
                  Apply a dime-sized amount of beeswax-based neutral cream every 4-6 weeks to preserve supple moisture.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white shadow-sm space-y-2 border border-gray-100">
                <span className="text-[10px] font-mono text-gray-400 font-bold">STEP 03</span>
                <h4 className="text-sm font-bold text-black">Natural Cedar Tree Storage</h4>
                <p className="text-[13px] text-[#444748] leading-relaxed">
                  Insert cedar shoetrees between outings to absorb ambient foot perspiration and retain toe-spring alignment.
                </p>
              </div>
            </div>
          )}

          {/* Tab Content 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Rating Bento */}
              <div className="p-6 md:p-8 rounded-xl bg-white shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center border border-gray-100">
                <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-1">
                  <span className="font-display text-[48px] font-bold text-black leading-none">
                    4.9
                  </span>
                  <div className="flex text-amber-500 text-[18px]">
                    {[1, 2, 3, 4, 5].map(i => (
                      <span key={i} className="material-symbols-outlined text-[20px] fill-1">
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-[#444748]">
                    Based on 420 verified owner evaluations across India
                  </p>
                </div>

                <div className="md:col-span-8 space-y-2">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-12 font-bold">5 Star</span>
                    <div className="flex-1 h-2 rounded-full bg-[#eeeeee] overflow-hidden">
                      <div className="h-full bg-black rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="w-12 text-right font-mono text-[11px]">85%</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-12 font-bold">4 Star</span>
                    <div className="flex-1 h-2 rounded-full bg-[#eeeeee] overflow-hidden">
                      <div className="h-full bg-black rounded-full" style={{ width: '12%' }}></div>
                    </div>
                    <span className="w-12 text-right font-mono text-[11px]">12%</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-12 font-bold">3 Star</span>
                    <div className="flex-1 h-2 rounded-full bg-[#eeeeee] overflow-hidden">
                      <div className="h-full bg-black rounded-full" style={{ width: '2%' }}></div>
                    </div>
                    <span className="w-12 text-right font-mono text-[11px]">2%</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-12 font-bold">1-2 Star</span>
                    <div className="flex-1 h-2 rounded-full bg-[#eeeeee] overflow-hidden">
                      <div className="h-full bg-black rounded-full" style={{ width: '1%' }}></div>
                    </div>
                    <span className="w-12 text-right font-mono text-[11px]">1%</span>
                  </div>
                </div>
              </div>

              {/* Review cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-white shadow-sm flex flex-col justify-between space-y-4 border border-gray-100">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-black">Vikramaditya S.</span>
                      <span className="text-[10px] text-emerald-800 flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        Verified Buyer
                      </span>
                    </div>
                    <div className="flex text-amber-500 text-[14px]">
                      {[1, 2, 3, 4, 5].map(i => (
                        <span key={i} className="material-symbols-outlined text-[16px] fill-1">
                          star
                        </span>
                      ))}
                    </div>
                    <p className="text-[13px] text-[#444748] leading-relaxed">
                      "Wears UK 9 in Nike and Stan Smiths—bought UK 9 here and it fits absolutely like a tailored glove. Leather quality is superior to kicks that cost triple."
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] font-mono text-gray-400">
                    Ordered: UK 9 • Chalk White / Gum
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-white shadow-sm flex flex-col justify-between space-y-4 border border-gray-100">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-black">Arjun Mehta</span>
                      <span className="text-[10px] text-emerald-800 flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        Verified Buyer
                      </span>
                    </div>
                    <div className="flex text-amber-500 text-[14px]">
                      {[1, 2, 3, 4, 5].map(i => (
                        <span key={i} className="material-symbols-outlined text-[16px] fill-1">
                          star
                        </span>
                      ))}
                    </div>
                    <p className="text-[13px] text-[#444748] leading-relaxed">
                      "Zero heel slip and zero blister break-in period. Wore them straight through a 4-day conference in Bangalore. Incredible support in the arch."
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] font-mono text-gray-400">
                    Ordered: UK 10 • Jet Black
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-white shadow-sm flex flex-col justify-between space-y-4 border border-gray-100">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-black">Devika Raman</span>
                      <span className="text-[10px] text-emerald-800 flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        Verified Buyer
                      </span>
                    </div>
                    <div className="flex text-amber-500 text-[14px]">
                      {[1, 2, 3, 4, 5].map(i => (
                        <span key={i} className="material-symbols-outlined text-[16px] fill-1">
                          star
                        </span>
                      ))}
                    </div>
                    <p className="text-[13px] text-[#444748] leading-relaxed">
                      "Clean minimal design with zero loud logos. You can dress this right under a blazer or pair it with cotton gym shorts. Highly recommend."
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] font-mono text-gray-400">
                    Ordered: UK 8 • Chalk White / Gum
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. 'Complete The Look' Bundle Conversion Module */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 py-16">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md space-y-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#444748] font-bold block mb-1">
                Curated Uniform
              </span>
              <h2 className="font-headline text-[24px] md:text-[28px] font-bold text-black">
                Complete The Look
              </h2>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg w-fit border border-emerald-200">
              Bundle Discount: Save ₹800 instantly
            </span>
          </div>

          {/* Bundle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Base item */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-[#f3f3f3]">
              <div className="w-20 h-20 aspect-square rounded-md overflow-hidden shrink-0 bg-white">
                <img
                  alt={product.title}
                  className="w-full h-full object-cover"
                  src={product.heroImage}
                />
              </div>
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded bg-white text-[10px] uppercase font-bold text-black">
                  This Item
                </span>
                <h4 className="text-xs font-bold text-black truncate">{product.title}</h4>
                <span className="text-xs text-black font-bold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Linen overshirt */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-[#f3f3f3]">
              <div className="w-20 h-20 aspect-square rounded-md overflow-hidden shrink-0 bg-white">
                <img
                  alt="Heavy Linen Field Overshirt"
                  className="w-full h-full object-cover"
                  src={APPAREL_ITEMS[0].image}
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-black">Heavy Linen Field Overshirt</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-black font-bold">₹1,899</span>
                  <span className="text-[11px] text-gray-400 line-through">₹2,499</span>
                </div>
                <span className="text-[10px] text-[#444748]">Size: Medium (True Fit)</span>
              </div>
            </div>

            {/* Chinos */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-[#f3f3f3]">
              <div className="w-20 h-20 aspect-square rounded-md overflow-hidden shrink-0 bg-white">
                <img
                  alt="Architect Tapered Chinos"
                  className="w-full h-full object-cover"
                  src={APPAREL_ITEMS[2].image}
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-black">Architect Tapered Chinos</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-black font-bold">₹1,599</span>
                  <span className="text-[11px] text-gray-400 line-through">₹1,999</span>
                </div>
                <span className="text-[10px] text-[#444748]">Waist: 32 / Length: 30</span>
              </div>
            </div>
          </div>

          {/* Bundle Total & Checkout CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4 border-t border-gray-100">
            <div>
              <span className="text-xs text-[#444748]">Total Bundle Price (All 3 Essentials):</span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-[24px] font-bold text-black">₹5,197</span>
                <span className="text-sm text-gray-400 line-through">₹5,997</span>
                <span className="text-xs text-emerald-800 font-bold">(Saved ₹800)</span>
              </div>
            </div>

            <button
              onClick={handleAddBundleToBag}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-black text-white hover:bg-neutral-800 transition-colors text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>+ Add Complete Look to Bag</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Recently Explored Rail */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 pb-16">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-[20px] font-bold text-black uppercase tracking-tight">
              Recently Explored
            </h3>
            <button
              onClick={() => navigateTo('catalog')}
              className="text-xs text-black hover:underline uppercase tracking-wider font-bold"
            >
              View All Footwear
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {RECENTLY_EXPLORED.map(item => (
              <div
                key={item.id}
                onClick={() => navigateTo('catalog')}
                className="group flex flex-col bg-white p-3.5 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
              >
                <div className="aspect-square w-full rounded-lg overflow-hidden bg-[#f3f3f3] mb-3">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    src={item.image}
                  />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                  {item.category}
                </span>
                <h4 className="text-xs font-bold text-black truncate">{item.title}</h4>
                <span className="text-xs text-black font-bold mt-1">
                  ₹{item.price.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1-Click Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
      />
    </div>
  );
};
