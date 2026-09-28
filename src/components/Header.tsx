import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BRAND_LOGO } from '../data/products';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    wishlist,
    cartCount,
    cartTotal,
    searchQuery,
    setSearchQuery,
    setCatalogFilters
  } = useStore();

  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const handleNavClick = (view: 'home' | 'catalog' | 'pdp' | 'cart', category?: string) => {
    if (category) {
      setCatalogFilters(prev => ({
        ...prev,
        category: category as any
      }));
    }
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCatalogFilters(prev => ({ ...prev, searchQuery: searchQuery.trim() }));
      navigateTo('catalog');
      setShowSearchDropdown(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* 1. Announcement Strip */}
      {announcementVisible && (
        <div className="bg-[#000000] text-[#ffffff] px-4 md:px-12 flex items-center justify-between h-9 text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all">
          <div className="flex-1 text-center truncate">
            <span>Free shipping on orders above ₹999</span>
            <span className="mx-2 opacity-40">•</span>
            <span>Easy 7-day instant returns</span>
            <span className="mx-2 opacity-40">•</span>
            <span className="text-[#b4c5ff] font-bold">New Spring/Summer Drop Live</span>
          </div>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="text-white/60 hover:text-white transition-opacity ml-2 flex items-center"
            type="button"
            aria-label="Dismiss banner"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* 2. Main Navigation Bar */}
      <div className="h-20 w-full px-4 md:px-12 flex items-center justify-between gap-4 max-w-[1440px] mx-auto">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left"
            type="button"
          >
            <img
              alt="STEPSTYLE Brand Logo"
              className="h-8 w-auto object-contain"
              src={BRAND_LOGO}
            />
            <span className="font-headline text-[22px] font-bold tracking-tight text-[#000000] uppercase">
              STEPSTYLE
            </span>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-6 text-[12px] font-semibold tracking-wider uppercase text-[#444748]">
          <button
            onClick={() => handleNavClick('catalog', 'All Footwear')}
            className={`transition-colors pb-1 hover:text-black ${
              currentView === 'catalog'
                ? 'text-black font-bold border-b-2 border-black'
                : ''
            }`}
          >
            MEN
          </button>
          <button
            onClick={() => handleNavClick('catalog', 'All Footwear')}
            className="hover:text-black transition-colors pb-1"
          >
            WOMEN
          </button>
          <button
            onClick={() => handleNavClick('catalog')}
            className={`transition-colors pb-1 hover:text-black ${
              currentView === 'catalog'
                ? 'text-black font-bold border-b-2 border-black'
                : ''
            }`}
          >
            SHOES
          </button>
          <button
            onClick={() => handleNavClick('catalog')}
            className="hover:text-black transition-colors pb-1"
          >
            CLOTHING
          </button>
          <button
            onClick={() => handleNavClick('catalog')}
            className="hover:text-black transition-colors pb-1"
          >
            ACCESSORIES
          </button>
          <button
            onClick={() => {
              setCatalogFilters(prev => ({ ...prev, sortBy: 'newest' }));
              navigateTo('catalog');
            }}
            className="hover:text-black transition-colors pb-1"
          >
            NEW ARRIVALS
          </button>
          <button
            onClick={() => {
              setCatalogFilters(prev => ({ ...prev, sortBy: 'rating' }));
              navigateTo('catalog');
            }}
            className="hover:text-black transition-colors pb-1"
          >
            BEST SELLERS
          </button>
          <button
            onClick={() => {
              setCatalogFilters(prev => ({ ...prev, maxPrice: 2999 }));
              navigateTo('catalog');
            }}
            className="hover:text-black transition-colors pb-1 flex items-center gap-1.5"
          >
            <span>SALE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] inline-block animate-pulse"></span>
          </button>
        </nav>

        {/* Right Tools & Actions */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden md:flex items-center bg-[#f3f3f3] hover:bg-[#eeeeee] transition-colors rounded-full px-3.5 py-1.5 w-56 lg:w-72"
          >
            <span className="material-symbols-outlined text-[18px] text-[#444748] mr-1.5">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search sneakers, shirts, boots..."
              className="bg-transparent w-full text-[13px] text-[#1a1c1c] placeholder:text-[#747878] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-black"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}
          </form>

          {/* Wishlist Button */}
          <button
            onClick={() => handleNavClick('catalog')}
            className="relative p-2 text-[#444748] hover:text-black transition-colors rounded-full flex items-center justify-center"
            title="View Wishlist"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                wishlist.length > 0 ? 'text-red-600 fill-1' : ''
              }`}
            >
              favorite
            </span>
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#000000] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button with Price & Counter */}
          <button
            onClick={() => handleNavClick('cart')}
            className={`relative p-2 transition-colors rounded-full flex items-center justify-center gap-1.5 ${
              currentView === 'cart'
                ? 'bg-black text-white px-3'
                : 'text-[#444748] hover:text-black hover:bg-[#f3f3f3]'
            }`}
            title="Open Shopping Bag"
            type="button"
          >
            <div className="relative">
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {cartCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1.5 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center ${
                    currentView === 'cart'
                      ? 'bg-white text-black'
                      : 'bg-black text-white'
                  }`}
                >
                  {cartCount}
                </span>
              )}
            </div>
            <span
              className={`hidden lg:inline-block text-[12px] font-bold pl-1 ${
                currentView === 'cart' ? 'text-white' : 'text-[#000000]'
              }`}
            >
              ₹{cartTotal.toLocaleString('en-IN')}
            </span>
          </button>

          {/* User Account / Profile icon */}
          <button
            onClick={() => handleNavClick('home')}
            className="p-1 rounded-full text-black hover:opacity-80 transition-opacity"
            title="User Account"
            type="button"
          >
            <div className="w-8 h-8 rounded-full bg-[#000000] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white text-[18px]">
                person
              </span>
            </div>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-black hover:bg-[#f3f3f3] rounded-lg"
            type="button"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200 px-6 py-6 shadow-xl space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-[#f3f3f3] rounded-lg px-3 py-2">
            <span className="material-symbols-outlined text-[20px] text-gray-500 mr-2">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search catalog..."
              className="bg-transparent w-full text-sm focus:outline-none"
            />
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm font-bold uppercase tracking-wider text-gray-800">
            <button
              onClick={() => handleNavClick('catalog', 'All Footwear')}
              className="text-left py-2 border-b border-gray-100"
            >
              Men Footwear
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'All Footwear')}
              className="text-left py-2 border-b border-gray-100"
            >
              Women Footwear
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Low-Top')}
              className="text-left py-2 border-b border-gray-100"
            >
              Low-Top Soles
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Running')}
              className="text-left py-2 border-b border-gray-100"
            >
              Running Trainers
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Loafers')}
              className="text-left py-2 border-b border-gray-100"
            >
              Loafers &amp; Slides
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              className="text-left py-2 border-b border-gray-100 text-red-600 font-bold"
            >
              Sale Edition
            </button>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => handleNavClick('cart')}
              className="flex-1 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg text-center"
            >
              View Bag ({cartCount})
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              className="flex-1 py-3 border border-black text-black text-xs font-bold uppercase tracking-wider rounded-lg text-center"
            >
              Browse Catalog
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
