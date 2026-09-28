import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Category, Silhouette, Gender, Material, Product } from '../types';

export const CatalogView: React.FC = () => {
  const {
    navigateTo,
    addToCart,
    toggleWishlist,
    isWishlisted,
    openSizeModal,
    showToast,
    catalogFilters,
    setCatalogFilters,
    resetCatalogFilters
  } = useStore();

  const [colsMode, setColsMode] = useState<3 | 4>(4);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter products based on active criteria
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category
      if (catalogFilters.category !== 'All Footwear') {
        if (product.category !== catalogFilters.category) return false;
      }
      // Gender
      if (catalogFilters.gender.length > 0) {
        if (!catalogFilters.gender.includes(product.gender)) return false;
      }
      // Silhouette
      if (catalogFilters.silhouette.length > 0) {
        if (!catalogFilters.silhouette.includes(product.silhouette)) return false;
      }
      // In stock
      if (catalogFilters.inStockOnly && !product.inStock) {
        return false;
      }
      // Price
      if (product.price < catalogFilters.minPrice || product.price > catalogFilters.maxPrice) {
        return false;
      }
      // Material
      if (catalogFilters.materials.length > 0) {
        if (!catalogFilters.materials.includes(product.material)) return false;
      }
      // Search
      if (catalogFilters.searchQuery.trim()) {
        const query = catalogFilters.searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesSub = product.subtitle.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSub && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (catalogFilters.sortBy === 'price-low') return a.price - b.price;
      if (catalogFilters.sortBy === 'price-high') return b.price - a.price;
      if (catalogFilters.sortBy === 'rating') return b.rating - a.rating;
      if (catalogFilters.sortBy === 'newest') return (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0);
      return 0; // recommended
    });
  }, [catalogFilters]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = catalogFilters.sizes[0] || 'UK 9';
    addToCart(product, defaultSize, product.colors[0]?.name || 'Standard');
    setQuickAddedId(product.id);
    setTimeout(() => {
      setQuickAddedId(null);
    }, 1800);
  };

  const handleGenderToggle = (g: Gender) => {
    setCatalogFilters(prev => {
      const exists = prev.gender.includes(g);
      return {
        ...prev,
        gender: exists ? prev.gender.filter(item => item !== g) : [...prev.gender, g]
      };
    });
  };

  const handleSilhouetteToggle = (s: Silhouette) => {
    setCatalogFilters(prev => {
      const exists = prev.silhouette.includes(s);
      return {
        ...prev,
        silhouette: exists ? prev.silhouette.filter(item => item !== s) : [...prev.silhouette, s]
      };
    });
  };

  const handleSizeToggle = (sz: string) => {
    setCatalogFilters(prev => {
      const exists = prev.sizes.includes(sz);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter(item => item !== sz) : [...prev.sizes, sz]
      };
    });
  };

  const handleMaterialToggle = (m: Material) => {
    setCatalogFilters(prev => {
      const exists = prev.materials.includes(m);
      return {
        ...prev,
        materials: exists ? prev.materials.filter(item => item !== m) : [...prev.materials, m]
      };
    });
  };

  const categoriesList: Category[] = [
    'All Footwear',
    'Low-Top',
    'High-Top',
    'Running',
    'Loafers',
    'Slides'
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Breadcrumb Bar */}
      <div className="w-full px-4 md:px-12 py-2 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-[#444748]">
          <div className="flex items-center gap-2">
            <button onClick={() => navigateTo('home')} className="hover:text-black transition-colors">
              Home
            </button>
            <span className="opacity-40">/</span>
            <button onClick={() => navigateTo('catalog')} className="hover:text-black transition-colors">
              Men
            </button>
            <span className="opacity-40">/</span>
            <span className="hover:text-black transition-colors">Shoes</span>
            <span className="opacity-40">/</span>
            <span className="text-black font-bold">Sneakers &amp; Everyday Footwear</span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[10px] uppercase tracking-wider font-semibold">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dce2f3] text-[#151c27] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
              SS/25 Release Series
            </span>
            <span className="text-gray-500">Express 48H Shipping Available Across Metro Cities</span>
          </div>
        </div>
      </div>

      {/* 2. Editorial Category Header */}
      <div className="w-full px-4 md:px-12 py-10 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded bg-black text-white font-bold">
                Curated Catalog
              </span>
              <span className="text-xs text-[#585f6c] uppercase tracking-widest font-semibold">
                Edition 04 — Modern Uniform
              </span>
            </div>
            <h1 className="font-headline text-[32px] md:text-[44px] text-black tracking-tight uppercase font-bold">
              EVERYDAY FOOTWEAR &amp; SNEAKERS
            </h1>
            <p className="text-[15px] text-[#444748] leading-relaxed">
              Engineered daily silhouettes combining architectural tailoring with cloud-comfort soles. Handcrafted in disciplined, limited batches using sustainable Italian leathers and ultra-resilient foams.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div className="px-4 py-2 rounded-xl bg-[#f3f3f3] flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center font-headline text-[18px] font-bold">
                48
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-black font-bold">
                  Styles Ready to Ship
                </div>
                <div className="text-[12px] text-[#585f6c]">Updated 14 mins ago</div>
              </div>
            </div>

            <button
              onClick={() => openSizeModal()}
              className="px-4 py-3 rounded-lg bg-[#eeeeee] hover:bg-[#e2e2e2] transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-black"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">straighten</span>
              Footwear Fit Guide
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sticky Controls: Top Action Ribbon & Active Filters */}
      <div className="sticky top-20 z-30 w-full bg-white/95 backdrop-blur-md px-4 md:px-12 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-3">
          {/* Upper Strip: Category Pills & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Quick Horizontal Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
              {categoriesList.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCatalogFilters(prev => ({ ...prev, category: cat }))}
                  className={`px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wide shrink-0 transition-all font-semibold ${
                    catalogFilters.category === cat
                      ? 'bg-black text-white shadow-sm font-bold'
                      : 'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-black'
                  }`}
                  type="button"
                >
                  {cat} {cat === 'All Footwear' ? '(48)' : ''}
                </button>
              ))}
            </div>

            {/* Filter Tools & Sorting */}
            <div className="flex items-center gap-3 ml-auto">
              {/* In-category search input */}
              <div className="relative hidden sm:block w-48 xl:w-56">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#585f6c]">
                  search
                </span>
                <input
                  type="text"
                  value={catalogFilters.searchQuery}
                  onChange={e => setCatalogFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  placeholder="Filter this view..."
                  className="w-full bg-[#f3f3f3] pl-9 pr-3 py-1.5 rounded-lg text-xs text-black placeholder:text-[#747878] focus:outline-none focus:bg-white focus:ring-1 focus:ring-black transition-colors"
                />
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={catalogFilters.sortBy}
                  onChange={e => setCatalogFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  className="bg-[#f3f3f3] hover:bg-[#eeeeee] px-3 py-1.5 rounded-lg cursor-pointer text-xs font-bold uppercase tracking-wider text-black focus:outline-none pr-8 appearance-none"
                >
                  <option value="recommended">Sort: Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">New Arrivals</option>
                </select>
                <span className="material-symbols-outlined text-[16px] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  expand_more
                </span>
              </div>

              {/* Layout Toggle */}
              <div className="hidden xl:flex items-center p-0.5 rounded-lg bg-[#f3f3f3]">
                <button
                  onClick={() => setColsMode(3)}
                  className={`p-1 rounded transition-colors ${
                    colsMode === 3 ? 'bg-white text-black shadow-sm font-bold' : 'text-gray-500 hover:text-black'
                  }`}
                  type="button"
                  title="3 Column Grid"
                >
                  <span className="material-symbols-outlined text-[20px]">view_column_2</span>
                </button>
                <button
                  onClick={() => setColsMode(4)}
                  className={`p-1 rounded transition-colors ${
                    colsMode === 4 ? 'bg-white text-black shadow-sm font-bold' : 'text-gray-500 hover:text-black'
                  }`}
                  type="button"
                  title="4 Column Grid"
                >
                  <span className="material-symbols-outlined text-[20px]">grid_view</span>
                </button>
              </div>
            </div>
          </div>

          {/* Lower Strip: Active Filter Tags & Reset */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-100">
            <span className="text-[10px] uppercase tracking-widest text-[#585f6c] font-bold mr-1">
              Active:
            </span>

            {catalogFilters.gender.map(g => (
              <span
                key={g}
                className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-md bg-[#eeeeee] text-black text-[10px] font-bold uppercase tracking-wide"
              >
                Gender: {g}
                <button
                  onClick={() => handleGenderToggle(g)}
                  className="hover:text-red-600 transition-colors flex items-center"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            ))}

            {catalogFilters.silhouette.map(s => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-md bg-[#eeeeee] text-black text-[10px] font-bold uppercase tracking-wide"
              >
                Type: {s}
                <button
                  onClick={() => handleSilhouetteToggle(s)}
                  className="hover:text-red-600 transition-colors flex items-center"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            ))}

            {catalogFilters.sizes.map(sz => (
              <span
                key={sz}
                className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-md bg-[#eeeeee] text-black text-[10px] font-bold uppercase tracking-wide"
              >
                Size: {sz}
                <button
                  onClick={() => handleSizeToggle(sz)}
                  className="hover:text-red-600 transition-colors flex items-center"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            ))}

            <button
              onClick={resetCatalogFilters}
              className="text-[10px] text-[#585f6c] hover:text-black underline ml-2 transition-colors uppercase font-bold tracking-wider"
              type="button"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      </div>

      {/* 4. Primary Workspace: Sidebar + Products */}
      <div className="w-full px-4 md:px-12 py-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SIDEBAR: Faceted Filters */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm space-y-6 border border-gray-100">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-black">tune</span>
                  <h2 className="font-headline text-[18px] font-bold uppercase tracking-tight text-black">
                    Filters
                  </h2>
                </div>
                <span className="text-[10px] text-[#585f6c] uppercase font-semibold">
                  {catalogFilters.gender.length + catalogFilters.silhouette.length + catalogFilters.sizes.length} Active
                </span>
              </div>

              {/* Section 1: In Stock Only Toggle */}
              <div className="p-3 rounded-lg bg-[#f3f3f3] flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-black">In Stock Only</div>
                  <div className="text-[11px] text-[#585f6c]">Exclude pre-orders</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={catalogFilters.inStockOnly}
                    onChange={e => setCatalogFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#dadada] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>

              {/* Section 2: Gender */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-black flex items-center justify-between">
                  Gender
                  <span className="material-symbols-outlined text-[16px] text-gray-400">remove</span>
                </h3>
                <div className="space-y-2 text-sm">
                  {(['Men', 'Women', 'Unisex Standard'] as Gender[]).map((g, idx) => (
                    <label key={g} className="flex items-center justify-between cursor-pointer group">
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={catalogFilters.gender.includes(g)}
                          onChange={() => handleGenderToggle(g)}
                          className="w-4 h-4 accent-black rounded cursor-pointer"
                        />
                        <span className={`text-xs ${catalogFilters.gender.includes(g) ? 'font-bold text-black' : 'text-gray-600'}`}>
                          {g}
                        </span>
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {idx === 0 ? '32' : idx === 1 ? '24' : '16'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 3: Silhouette */}
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-black flex items-center justify-between">
                  Silhouette
                  <span className="material-symbols-outlined text-[16px] text-gray-400">remove</span>
                </h3>
                <div className="space-y-2 text-sm">
                  {(
                    [
                      { name: 'Sneakers', count: 28 },
                      { name: 'Penny Loafers', count: 7 },
                      { name: 'Running Trainers', count: 9 },
                      { name: 'Everyday Slides', count: 4 },
                      { name: 'Chelsea Boots', count: 3 }
                    ] as { name: Silhouette; count: number }[]
                  ).map(s => (
                    <label key={s.name} className="flex items-center justify-between cursor-pointer group">
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={catalogFilters.silhouette.includes(s.name)}
                          onChange={() => handleSilhouetteToggle(s.name)}
                          className="w-4 h-4 accent-black rounded cursor-pointer"
                        />
                        <span className={`text-xs ${catalogFilters.silhouette.includes(s.name) ? 'font-bold text-black' : 'text-gray-600'}`}>
                          {s.name}
                        </span>
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">{s.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 4: Size Selector Grid (UK / India) */}
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                    Size (UK / IND)
                  </h3>
                  <button
                    onClick={() => openSizeModal()}
                    className="text-[10px] text-gray-500 hover:text-black underline font-semibold"
                  >
                    Chart
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12', 'UK 13'].map(sz => {
                    const isOOS = sz === 'UK 12';
                    const isSelected = catalogFilters.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        disabled={isOOS}
                        onClick={() => handleSizeToggle(sz)}
                        type="button"
                        className={`h-10 rounded-lg text-xs font-bold transition-all ${
                          isOOS
                            ? 'bg-[#f3f3f3] opacity-40 text-gray-400 line-through cursor-not-allowed'
                            : isSelected
                            ? 'bg-black text-white shadow-sm'
                            : 'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-gray-800'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-[#585f6c] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  92% of users say our UK sizes fit true to size.
                </p>
              </div>

              {/* Section 5: Color Swatches */}
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                  Color Palette
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => showToast('Filtered by Triple White')}
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200 hover:scale-105 transition-transform"
                    title="Triple White"
                    type="button"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#f8f9fa] shadow-inner"></span>
                  </button>
                  <button
                    onClick={() => showToast('Filtered by Jet Black')}
                    className="w-8 h-8 rounded-full bg-black flex items-center justify-center ring-2 ring-black ring-offset-2 hover:scale-105 transition-transform"
                    title="Jet Black"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px] text-white font-bold">check</span>
                  </button>
                  <button
                    onClick={() => showToast('Filtered by Earth Taupe')}
                    className="w-8 h-8 rounded-full bg-[#b89f8a] hover:scale-105 transition-transform shadow-sm"
                    title="Earth Taupe"
                    type="button"
                  ></button>
                  <button
                    onClick={() => showToast('Filtered by Slate Grey')}
                    className="w-8 h-8 rounded-full bg-[#585f6c] hover:scale-105 transition-transform shadow-sm"
                    title="Slate Grey"
                    type="button"
                  ></button>
                  <button
                    onClick={() => showToast('Filtered by Olive Drab')}
                    className="w-8 h-8 rounded-full bg-[#4a5840] hover:scale-105 transition-transform shadow-sm"
                    title="Olive Drab"
                    type="button"
                  ></button>
                  <button
                    onClick={() => showToast('Filtered by Navy Cobalt')}
                    className="w-8 h-8 rounded-full bg-[#1b2b48] hover:scale-105 transition-transform shadow-sm"
                    title="Navy Cobalt"
                    type="button"
                  ></button>
                </div>
              </div>

              {/* Section 6: Price Bracket */}
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                  Price Bracket
                </h3>
                <div className="py-2">
                  <input
                    type="range"
                    min="999"
                    max="4999"
                    step="100"
                    value={catalogFilters.maxPrice}
                    onChange={e => setCatalogFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                    className="w-full accent-black cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="p-2 rounded-lg bg-[#f3f3f3] flex-1">
                    <div className="text-[10px] text-[#585f6c]">Min</div>
                    <div className="text-xs font-bold text-black">₹999</div>
                  </div>
                  <span className="text-gray-400">—</span>
                  <div className="p-2 rounded-lg bg-[#f3f3f3] flex-1">
                    <div className="text-[10px] text-[#585f6c]">Max</div>
                    <div className="text-xs font-bold text-black">
                      ₹{catalogFilters.maxPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 7: Material Filter */}
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                  Material Origin
                </h3>
                <div className="space-y-2 text-sm">
                  {(
                    [
                      { name: 'Italian Calfskin', count: 19 },
                      { name: 'Breathable Supima Mesh', count: 14 },
                      { name: 'Heavy Organic Canvas', count: 8 },
                      { name: 'High-Rebound EVA Foam', count: 7 }
                    ] as { name: Material; count: number }[]
                  ).map(m => (
                    <label key={m.name} className="flex items-center justify-between cursor-pointer group">
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={catalogFilters.materials.includes(m.name)}
                          onChange={() => handleMaterialToggle(m.name)}
                          className="w-4 h-4 accent-black rounded cursor-pointer"
                        />
                        <span className={`text-xs ${catalogFilters.materials.includes(m.name) ? 'font-bold text-black' : 'text-gray-600'}`}>
                          {m.name}
                        </span>
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">{m.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 8: Rating */}
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                  Customer Rating
                </h3>
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={catalogFilters.minRating === 4.0}
                      onChange={e => setCatalogFilters(prev => ({ ...prev, minRating: e.target.checked ? 4.0 : 0 }))}
                      className="w-4 h-4 accent-black rounded cursor-pointer"
                    />
                    <span className="flex items-center gap-1 text-black font-semibold text-xs">
                      4.0 <span className="material-symbols-outlined text-[16px] text-amber-500 fill-1">star</span> &amp; Above
                    </span>
                  </span>
                  <span className="text-[10px] text-[#585f6c] font-bold">42</span>
                </label>
              </div>
            </div>

            {/* Sticky Editorial Concierge Promo Box */}
            <div className="p-6 rounded-xl bg-black text-white shadow-md space-y-2 relative overflow-hidden">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#b4c5ff]">
                Concierge Sizing
              </span>
              <div className="font-headline text-[20px] font-bold uppercase">
                Not sure of your fit?
              </div>
              <p className="text-[13px] text-gray-300 leading-relaxed">
                Order two adjacent sizes. Keep the silhouette that feels custom, return the other on your doorstep in 15 seconds.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => showToast('Concierge Sizing enabled: Doorstep size exchange is 100% free')}
                  className="w-full py-2.5 rounded-lg bg-white text-black text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors font-bold"
                  type="button"
                >
                  Learn How It Works
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: Responsive Catalog Grid */}
          <section className="lg:col-span-9 space-y-8">
            {/* ROW 1 OF PRODUCTS (First 4 items) */}
            <div
              className={`grid gap-4 ${
                colsMode === 3
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
              }`}
            >
              {filteredProducts.slice(0, 4).map(product => {
                const isAdded = quickAddedId === product.id;
                return (
                  <div
                    key={product.id}
                    onClick={() => navigateTo('pdp', product.id)}
                    className="group bg-white rounded-xl p-3 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative border border-gray-100 cursor-pointer"
                  >
                    <div className="space-y-3">
                      {/* Image Container */}
                      <div className="relative w-full aspect-square rounded-lg bg-[#f3f3f3] overflow-hidden">
                        <img
                          alt={product.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          src={product.heroImage}
                        />

                        {product.badge && (
                          <span
                            className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm ${
                              product.badge === 'HOT'
                                ? 'bg-[#ba1a1a] text-white'
                                : product.badge === 'NEW'
                                ? 'bg-black text-white'
                                : product.badge === 'LIMITED'
                                ? 'bg-[#585f6c] text-white'
                                : 'bg-white/90 backdrop-blur-md text-black'
                            }`}
                          >
                            {product.badge}
                          </span>
                        )}

                        <button
                          onClick={e => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          aria-label="Add to Wishlist"
                          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-colors shadow-sm ${
                            isWishlisted(product.id) ? 'text-red-600' : 'text-gray-700 hover:text-black'
                          }`}
                          type="button"
                        >
                          <span
                            className={`material-symbols-outlined text-[18px] ${
                              isWishlisted(product.id) ? 'fill-1 text-red-600' : ''
                            }`}
                          >
                            favorite
                          </span>
                        </button>
                      </div>

                      {/* Metadata */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {product.colors.map(c => (
                              <span
                                key={c.name}
                                style={{ backgroundColor: c.hex }}
                                className="w-3 h-3 rounded-full border border-gray-300 shadow-sm"
                                title={c.name}
                              />
                            ))}
                            {product.colors.length > 2 && (
                              <span className="text-[10px] text-gray-500 font-semibold ml-1">
                                +{product.colors.length - 2}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-black">
                            <span className="material-symbols-outlined text-[14px] text-amber-500 fill-1">
                              star
                            </span>
                            <span>{product.rating}</span>
                            <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
                          </div>
                        </div>

                        <h3 className="font-headline text-[15px] font-semibold text-black leading-tight hover:text-gray-600 transition-colors line-clamp-1">
                          {product.title}
                        </h3>
                        <p className="text-[12px] text-gray-500 truncate">{product.subtitle}</p>

                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="font-headline text-[18px] font-bold text-black">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700">
                            {product.discountBadge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Add Action */}
                    <div className="pt-3">
                      <button
                        onClick={e => handleQuickAdd(product, e)}
                        className={`w-full py-2.5 rounded-lg transition-all text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 ${
                          isAdded
                            ? 'bg-black text-white'
                            : 'bg-[#f3f3f3] hover:bg-black hover:text-white text-black'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isAdded ? 'check_circle' : 'shopping_bag'}
                        </span>
                        <span>{isAdded ? 'Added to Bag' : 'Quick Add'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* EDITORIAL BREAK: Promotional In-Grid Experience Capsule */}
            <div className="w-full rounded-2xl bg-[#eeeeee] p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-200">
              <div className="space-y-2 max-w-xl z-10">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black bg-white px-3 py-1 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  The STEPSTYLE Assurance
                </span>
                <h3 className="font-headline text-[24px] md:text-[28px] font-bold uppercase tracking-tight text-black">
                  7-Day Doorstep Fit Exchange &amp; Instant Return Pickup
                </h3>
                <p className="text-[14px] text-[#444748] leading-relaxed">
                  Every pair is precision-molded to ergonomic foot scans. If the fit isn't second nature on day one, exchange sizes right at your doorstep with zero fees.
                </p>
              </div>

              <div className="flex items-center gap-4 z-10 shrink-0">
                <div className="text-center px-4 py-3 bg-white rounded-xl shadow-sm">
                  <div className="font-headline text-[22px] font-bold text-black">100K+</div>
                  <div className="text-[10px] text-[#585f6c] uppercase font-bold">Delighted Fits</div>
                </div>
                <div className="text-center px-4 py-3 bg-white rounded-xl shadow-sm">
                  <div className="font-headline text-[22px] font-bold text-black">48 Hrs</div>
                  <div className="text-[10px] text-[#585f6c] uppercase font-bold">Doorstep Swap</div>
                </div>
              </div>
            </div>

            {/* ROW 2 OF PRODUCTS (Remaining items) */}
            <div
              className={`grid gap-4 ${
                colsMode === 3
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
              }`}
            >
              {filteredProducts.slice(4).map(product => {
                const isAdded = quickAddedId === product.id;
                return (
                  <div
                    key={product.id}
                    onClick={() => navigateTo('pdp', product.id)}
                    className="group bg-white rounded-xl p-3 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative border border-gray-100 cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="relative w-full aspect-square rounded-lg bg-[#f3f3f3] overflow-hidden">
                        <img
                          alt={product.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          src={product.heroImage}
                        />

                        {product.badge && (
                          <span
                            className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm ${
                              product.badge === 'NEW DROP'
                                ? 'bg-black text-white'
                                : product.badge === 'PREMIUM'
                                ? 'bg-[#dce2f3] text-[#151c27]'
                                : 'bg-white/90 backdrop-blur-md text-black'
                            }`}
                          >
                            {product.badge}
                          </span>
                        )}

                        <button
                          onClick={e => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          aria-label="Add to Wishlist"
                          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-colors shadow-sm ${
                            isWishlisted(product.id) ? 'text-red-600' : 'text-gray-700 hover:text-black'
                          }`}
                          type="button"
                        >
                          <span
                            className={`material-symbols-outlined text-[18px] ${
                              isWishlisted(product.id) ? 'fill-1 text-red-600' : ''
                            }`}
                          >
                            favorite
                          </span>
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {product.colors.map(c => (
                              <span
                                key={c.name}
                                style={{ backgroundColor: c.hex }}
                                className="w-3 h-3 rounded-full border border-gray-300 shadow-sm"
                                title={c.name}
                              />
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-black">
                            <span className="material-symbols-outlined text-[14px] text-amber-500 fill-1">
                              star
                            </span>
                            <span>{product.rating}</span>
                            <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
                          </div>
                        </div>

                        <h3 className="font-headline text-[15px] font-semibold text-black leading-tight hover:text-gray-600 transition-colors line-clamp-1">
                          {product.title}
                        </h3>
                        <p className="text-[12px] text-gray-500 truncate">{product.subtitle}</p>

                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="font-headline text-[18px] font-bold text-black">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700">
                            {product.discountBadge}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        onClick={e => handleQuickAdd(product, e)}
                        className={`w-full py-2.5 rounded-lg transition-all text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 ${
                          isAdded
                            ? 'bg-black text-white'
                            : 'bg-[#f3f3f3] hover:bg-black hover:text-white text-black'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isAdded ? 'check_circle' : 'shopping_bag'}
                        </span>
                        <span>{isAdded ? 'Added to Bag' : 'Quick Add'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Catalog Status Bar & Pagination Module */}
            <div className="w-full bg-white p-5 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-100">
              <div className="space-y-1 text-center md:text-left">
                <div className="text-xs text-black font-bold">Showing 8 of 48 Silhouettes</div>
                <div className="w-48 h-1.5 bg-[#f3f3f3] rounded-full overflow-hidden mx-auto md:mx-0">
                  <div className="w-1/6 h-full bg-black rounded-full"></div>
                </div>
              </div>

              {/* Numeric pagination */}
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="w-9 h-9 rounded-lg bg-[#f3f3f3] text-gray-400 disabled:opacity-40 flex items-center justify-center"
                  type="button"
                  aria-label="Previous page"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold flex items-center justify-center ${
                    currentPage === 1 ? 'bg-black text-white shadow-sm' : 'bg-[#f3f3f3] text-black'
                  }`}
                  type="button"
                >
                  1
                </button>
                <button
                  onClick={() => { setCurrentPage(2); showToast('Page 2 loaded'); }}
                  className={`w-9 h-9 rounded-lg text-xs font-bold flex items-center justify-center ${
                    currentPage === 2 ? 'bg-black text-white shadow-sm' : 'bg-[#f3f3f3] text-black hover:bg-[#e8e8e8]'
                  }`}
                  type="button"
                >
                  2
                </button>
                <button
                  onClick={() => { setCurrentPage(3); showToast('Page 3 loaded'); }}
                  className="w-9 h-9 rounded-lg bg-[#f3f3f3] hover:bg-[#e8e8e8] text-black text-xs font-bold flex items-center justify-center transition-colors"
                  type="button"
                >
                  3
                </button>
                <span className="px-1 text-gray-400 font-bold">...</span>
                <button
                  onClick={() => { setCurrentPage(6); showToast('Page 6 loaded'); }}
                  className="w-9 h-9 rounded-lg bg-[#f3f3f3] hover:bg-[#e8e8e8] text-black text-xs font-bold flex items-center justify-center transition-colors"
                  type="button"
                >
                  6
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(6, prev + 1))}
                  className="w-9 h-9 rounded-lg bg-[#f3f3f3] hover:bg-black hover:text-white text-black flex items-center justify-center transition-colors"
                  type="button"
                  aria-label="Next page"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>

              <div>
                <button
                  onClick={() => showToast('Loaded additional 8 silhouettes')}
                  className="px-5 py-2.5 rounded-lg bg-[#eeeeee] hover:bg-[#e2e2e2] transition-colors text-xs uppercase tracking-wider text-black font-bold"
                  type="button"
                >
                  Load More (8)
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 5. Editorial Footnote Banner: Materials & Transparency */}
      <div className="w-full bg-[#eeeeee] py-16 px-4 md:px-12 border-t border-gray-200">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-black">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-headline text-[18px] font-bold text-black uppercase">
                Direct Atelier Craft
              </h4>
              <p className="text-[13px] text-[#444748] leading-relaxed">
                We eliminate markup layers. High-grade full-grain leather footwear made accessible directly from certified craft centers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-black">
              <span className="material-symbols-outlined text-[24px]">recycling</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-headline text-[18px] font-bold text-black uppercase">
                Zero-Plastic Delivery
              </h4>
              <p className="text-[13px] text-[#444748] leading-relaxed">
                Every pair arrives in 100% recycled unbleached fiber cartons with zero polyurethane tape or redundant bubble linings.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-black">
              <span className="material-symbols-outlined text-[24px]">local_shipping</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-headline text-[18px] font-bold text-black uppercase">
                Prompt Metro Delivery
              </h4>
              <p className="text-[13px] text-[#444748] leading-relaxed">
                Orders processed with priority fulfillment across Bengaluru, Mumbai, Delhi-NCR, Hyderabad within 24–48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
