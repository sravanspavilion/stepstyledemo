import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CARE_KIT_ITEMS } from '../data/products';
import { CheckoutModal } from '../components/CheckoutModal';

export const CartView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    promoDiscount,
    cartTotal,
    cartCount,
    updateQuantity,
    removeFromCart,
    appliedPromo,
    applyPromo,
    removePromo,
    isGift,
    setIsGift,
    deliveryNote,
    setDeliveryNote,
    addApparelOrKitToCart,
    navigateTo,
    showToast,
    openSizeModal
  } = useStore();

  const [promoInput, setPromoInput] = useState(appliedPromo || '');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [addedKitIds, setAddedKitIds] = useState<string[]>([]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromo(promoInput);
    }
  };

  const handleAddCareKit = (item: typeof CARE_KIT_ITEMS[0]) => {
    addApparelOrKitToCart(item.title, item.price, item.price + 200, item.image, 'Standard', 'Universal');
    setAddedKitIds(prev => [...prev, item.id]);
    setTimeout(() => {
      setAddedKitIds(prev => prev.filter(id => id !== item.id));
    }, 2000);
  };

  const totalSaved = cartDiscount + promoDiscount;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Progress Header / Step Indicator */}
      <div className="w-full bg-white shadow-sm py-4 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-[#585f6c] uppercase tracking-widest block mb-0.5 font-bold">
              Checkout Step 01
            </span>
            <h1 className="font-headline text-[24px] md:text-[28px] text-black tracking-tight font-bold">
              Shopping Bag{' '}
              <span className="text-[#585f6c] font-normal text-[20px]">
                ({cartCount} {cartCount === 1 ? 'Item' : 'Items'})
              </span>
            </h1>
          </div>

          {/* Checkout Step Dots Flow */}
          <nav aria-label="Checkout Progress" className="flex items-center gap-3 bg-[#f3f3f3] px-5 py-2 rounded-full">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span className="text-xs text-black font-bold uppercase tracking-wider">
                Shopping Bag
              </span>
            </div>
            <span className="w-6 h-px bg-gray-300"></span>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-6 h-6 rounded-full bg-[#eeeeee] text-gray-700 text-xs flex items-center justify-center font-semibold">
                2
              </span>
              <span className="text-xs uppercase tracking-wider hidden sm:inline">Shipping</span>
            </div>
            <span className="w-6 h-px bg-gray-300"></span>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-6 h-6 rounded-full bg-[#eeeeee] text-gray-700 text-xs flex items-center justify-center font-semibold">
                3
              </span>
              <span className="text-xs uppercase tracking-wider hidden sm:inline">Payment</span>
            </div>
          </nav>
        </div>
      </div>

      {/* 2. Main Bag Content Grid */}
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-12 py-8">
        {/* Free Delivery Milestone Banner */}
        <div className="mb-6 p-4 rounded-xl bg-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f3f3f3] flex items-center justify-center text-black shrink-0">
              <span className="material-symbols-outlined text-[20px] fill-1">local_shipping</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-black">
                  You have unlocked FREE Express Delivery!
                </span>
                <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  Eligible
                </span>
              </div>
              <p className="text-xs text-[#585f6c] mt-0.5">
                All orders over ₹999 qualify for express prioritized dispatch and delivery.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-64 flex flex-col gap-1.5 shrink-0">
            <div className="flex justify-between text-[11px] text-[#585f6c] uppercase font-bold">
              <span>Target ₹999</span>
              <span className="text-black">100% Unlocked</span>
            </div>
            <div className="h-2 w-full bg-[#eeeeee] rounded-full overflow-hidden">
              <div className="h-full bg-black rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center space-y-4 shadow-sm border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-[#f3f3f3] flex items-center justify-center text-gray-400 mx-auto">
              <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
            </div>
            <h2 className="font-headline text-[22px] font-bold text-black uppercase">
              Your Shopping Bag is Empty
            </h2>
            <p className="text-sm text-[#444748] max-w-md mx-auto">
              Explore our disciplined footwear silhouettes and everyday wardrobe essentials to populate your bag.
            </p>
            <button
              onClick={() => navigateTo('catalog')}
              className="py-3 px-8 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors"
              type="button"
            >
              Discover Silhouettes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items (8 cols) */}
            <section className="lg:col-span-8 flex flex-col gap-4">
              {/* List Actions Bar */}
              <div className="flex items-center justify-between py-1 px-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#585f6c] font-bold">
                  <span>Items in Bag</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#eeeeee] text-black">
                    {cartCount}
                  </span>
                </div>
                <button
                  onClick={() => showToast('All bag items moved to wishlist')}
                  className="text-xs text-[#444748] hover:text-black transition-colors flex items-center gap-1 group font-semibold"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-gray-400 group-hover:text-black">
                    bookmark_add
                  </span>
                  <span>Move all to Wishlist</span>
                </button>
              </div>

              {/* Cart Items List */}
              {cart.map(item => (
                <article
                  key={item.id}
                  className="p-4 md:p-6 rounded-xl bg-white shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-6 transition-all hover:shadow-md relative border border-gray-100"
                >
                  {/* Thumbnail */}
                  <div className="w-full sm:w-40 sm:h-44 h-56 rounded-lg overflow-hidden bg-[#f3f3f3] shrink-0 relative">
                    <img
                      alt={item.product.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      src={item.product.heroImage}
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/90 text-[10px] font-bold text-black uppercase tracking-wider backdrop-blur-sm shadow-sm">
                      {item.product.silhouette || 'Apparel'}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <button
                            onClick={() => navigateTo('pdp', item.product.id)}
                            className="font-headline text-[18px] text-black hover:text-gray-600 transition-colors font-bold text-left"
                          >
                            {item.product.title}
                          </button>
                          <p className="text-xs text-[#585f6c] mt-1">
                            Color: <span className="text-black font-semibold">{item.selectedColor}</span>
                            {' '}•{' '}
                            Size: <span className="text-black font-semibold">{item.selectedSize}</span>
                          </p>
                        </div>

                        {/* Price */}
                        <div className="text-left sm:text-right mt-1 sm:mt-0">
                          <div className="font-headline text-[20px] font-bold text-black">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                          {item.product.originalPrice > item.product.price && (
                            <div className="text-xs text-gray-400 line-through">
                              ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                            </div>
                          )}
                          <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-emerald-100">
                            Saved ₹{((item.product.originalPrice - item.product.price) * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Stock Badge */}
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-black font-semibold">
                        <span className="w-2 h-2 rounded-full bg-black"></span>
                        <span>{item.product.stockNote || 'In Stock • Ready for dispatch today'}</span>
                      </div>
                    </div>

                    {/* Quantity Stepper & Actions */}
                    <div className="pt-4 mt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center rounded-lg bg-[#f3f3f3] p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
                          type="button"
                          aria-label="Decrease quantity"
                        >
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
                          type="button"
                          aria-label="Increase quantity"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-semibold">
                        <button
                          onClick={() => openSizeModal(item.product)}
                          className="text-[#444748] hover:text-black transition-colors flex items-center gap-1"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">straighten</span>
                          <span>Change Size</span>
                        </button>

                        <button
                          onClick={() => {
                            showToast(`Saved ${item.product.title} to wishlist`);
                            removeFromCart(item.id);
                          }}
                          className="text-[#444748] hover:text-black transition-colors flex items-center gap-1"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">favorite</span>
                          <span>Save for Later</span>
                        </button>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#585f6c] hover:text-red-600 transition-colors flex items-center gap-1"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {/* Value Add Gifting & Special Delivery Accordion Panel */}
              <div className="p-4 md:p-6 rounded-xl bg-white shadow-sm flex flex-col gap-4 border border-gray-100">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="gift-checkbox"
                    checked={isGift}
                    onChange={e => setIsGift(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded-sm bg-white text-black focus:ring-0 cursor-pointer accent-black"
                  />
                  <label htmlFor="gift-checkbox" className="cursor-pointer select-none">
                    <span className="text-sm font-bold text-black block">This order is a gift</span>
                    <span className="text-xs text-[#585f6c] block mt-0.5">
                      Include complimentary eco-luxe presentation gift packaging, customized message note card, and redact prices on recipient packing slip.
                    </span>
                  </label>
                </div>

                <div className="w-full pt-1">
                  <label htmlFor="delivery-note" className="text-[11px] uppercase tracking-wider text-[#585f6c] font-bold block mb-1.5">
                    Special Delivery Instructions / Gate Code
                  </label>
                  <div className="relative">
                    <input
                      id="delivery-note"
                      type="text"
                      value={deliveryNote}
                      onChange={e => setDeliveryNote(e.target.value)}
                      placeholder="e.g. Leave with concierge or ring Bell #4B..."
                      className="w-full h-12 px-4 rounded-lg bg-[#f3f3f3] text-xs text-black placeholder:text-[#747878] focus:outline-none focus:bg-white focus:ring-1 focus:ring-black transition-colors"
                    />
                    <span className="absolute right-3.5 top-3.5 material-symbols-outlined text-[20px] text-gray-400">
                      edit_note
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Column: Order Summary Sidebar (4 cols) */}
            <aside className="lg:col-span-4 sticky top-24 space-y-4">
              <div className="p-5 md:p-6 rounded-xl bg-white shadow-sm border border-gray-100">
                <h2 className="font-headline text-[20px] font-bold text-black tracking-tight pb-3 border-b border-gray-100">
                  Order Summary
                </h2>

                {/* Price Ledger */}
                <dl className="space-y-3 pt-3 text-xs">
                  <div className="flex items-center justify-between text-[#585f6c]">
                    <dt>Bag Total ({cartCount} {cartCount === 1 ? 'item' : 'items'})</dt>
                    <dd className="font-semibold text-black">
                      ₹{cartSubtotal.toLocaleString('en-IN')}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between text-[#585f6c]">
                    <dt className="flex items-center gap-1">
                      <span>Product Discounts</span>
                      <span className="material-symbols-outlined text-[16px] text-gray-400">info</span>
                    </dt>
                    <dd className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-100">
                      -₹{cartDiscount.toLocaleString('en-IN')}
                    </dd>
                  </div>

                  {appliedPromo && (
                    <div className="flex items-center justify-between text-[#585f6c]">
                      <dt className="flex items-center gap-1">
                        <span>Promo Code ({appliedPromo})</span>
                      </dt>
                      <dd className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-100">
                        -₹{promoDiscount.toLocaleString('en-IN')}
                      </dd>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[#585f6c]">
                    <dt>Standard Express Delivery</dt>
                    <dd className="font-medium text-black flex items-center gap-1.5">
                      <span className="line-through text-gray-400">₹149</span>
                      <span className="font-bold text-black uppercase text-[10px] bg-[#eeeeee] px-2 py-0.5 rounded">
                        FREE
                      </span>
                    </dd>
                  </div>

                  <div className="flex items-center justify-between text-[#585f6c]">
                    <dt>Estimated Taxes &amp; GST</dt>
                    <dd className="text-[10px] uppercase font-bold text-[#585f6c]">
                      Included in retail price
                    </dd>
                  </div>
                </dl>

                {/* Promo Input Section */}
                <div className="mt-4 pt-4 border-t border-gray-100 bg-[#f3f3f3] p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#585f6c] font-bold">
                      Have a Promo Coupon?
                    </span>
                    <button
                      onClick={() => showToast('Available: FIRSTSTEP10 (10% off), SPRING25 (15% off)')}
                      className="text-[11px] text-black font-bold hover:underline"
                    >
                      View Offers
                    </button>
                  </div>

                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={e => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="ENTER COUPON"
                      className="w-full h-10 px-3 rounded bg-white text-xs font-bold text-black uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <button
                      type="submit"
                      className="px-4 h-10 bg-black text-white text-[11px] rounded uppercase font-bold tracking-wider hover:bg-neutral-800 transition-colors shrink-0"
                    >
                      {appliedPromo ? 'Applied' : 'Apply'}
                    </button>
                  </form>

                  {appliedPromo && (
                    <div className="mt-2 flex items-center justify-between text-[11px] bg-white px-2.5 py-1.5 rounded border border-gray-200">
                      <span className="flex items-center gap-1 text-black font-semibold">
                        <span className="material-symbols-outlined text-[14px] text-emerald-600">
                          check_circle
                        </span>
                        10% Welcoming Discount Applied
                      </span>
                      <button
                        onClick={removePromo}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Total Calculation Highlight */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-headline text-[18px] font-bold text-black">
                        Total Payable
                      </span>
                      <span className="block text-[11px] text-[#585f6c]">
                        Inclusive of all federal taxes
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-headline text-[24px] font-bold text-black">
                        ₹{cartTotal.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {totalSaved > 0 && (
                    <div className="mt-2.5 p-2 rounded bg-[#f3f3f3] text-center text-[11px] text-black font-bold">
                      ✨ You are saving a total of ₹{totalSaved.toLocaleString('en-IN')} on this order
                    </div>
                  )}
                </div>

                {/* Checkout CTA */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setCheckoutModalOpen(true)}
                    className="w-full h-14 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.99]"
                    type="button"
                  >
                    <span>Proceed to Checkout</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>

                  {/* Express Pay Pills */}
                  <div className="pt-1 text-center">
                    <span className="text-[10px] uppercase tracking-wider text-[#585f6c] block mb-2 font-semibold">
                      Or Instant 1-Click Checkout via
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => setCheckoutModalOpen(true)}
                        className="h-9 rounded bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[11px] font-bold text-black flex items-center justify-center transition-colors"
                        type="button"
                      >
                        UPI
                      </button>
                      <button
                        onClick={() => setCheckoutModalOpen(true)}
                        className="h-9 rounded bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[11px] font-bold text-black flex items-center justify-center transition-colors"
                        type="button"
                      >
                        GPay
                      </button>
                      <button
                        onClick={() => setCheckoutModalOpen(true)}
                        className="h-9 rounded bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[11px] font-bold text-black flex items-center justify-center transition-colors"
                        type="button"
                      >
                        PhonePe
                      </button>
                      <button
                        onClick={() => setCheckoutModalOpen(true)}
                        className="h-9 rounded bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[11px] font-bold text-black flex items-center justify-center transition-colors"
                        type="button"
                      >
                        ApplePay
                      </button>
                    </div>
                  </div>
                </div>

                {/* Trust Guarantees */}
                <div className="mt-6 pt-4 border-t border-gray-100 space-y-2 text-xs text-[#585f6c]">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-black">lock</span>
                    <span>256-bit Bank Grade SSL Security</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-black">
                      published_with_changes
                    </span>
                    <span>7-Day Hassle-Free Instant Returns</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-black">
                      verified
                    </span>
                    <span>100% Verified Authentic STEPSTYLE Product</span>
                  </div>
                </div>
              </div>

              {/* Help Prompt Card */}
              <div className="p-4 rounded-xl bg-white shadow-sm flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[22px] text-[#585f6c]">
                    support_agent
                  </span>
                  <div>
                    <p className="text-xs font-bold text-black">Need sizing or order help?</p>
                    <p className="text-[11px] text-[#585f6c]">Concierge is active 9am - 9pm</p>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Opening STEPSTYLE Live Concierge')}
                  className="px-4 py-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#e8e8e8] text-black text-[10px] uppercase font-bold transition-colors"
                  type="button"
                >
                  Chat
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Cross Sell: Complete Your Care & Style Kit */}
        <section className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] text-[#585f6c] uppercase tracking-widest block mb-1 font-bold">
                Recommended Additions
              </span>
              <h2 className="font-headline text-[24px] md:text-[28px] font-bold text-black tracking-tight">
                Complete Your Care &amp; Style Kit
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => showToast('Browsing earlier accessories')}
                className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md flex items-center justify-center text-black transition-all border border-gray-100"
                type="button"
                aria-label="Previous accessories"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                onClick={() => showToast('Browsing next accessories')}
                className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md flex items-center justify-center text-black transition-all border border-gray-100"
                type="button"
                aria-label="Next accessories"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CARE_KIT_ITEMS.map(kit => {
              const isAdded = addedKitIds.includes(kit.id);
              return (
                <div
                  key={kit.id}
                  className="p-4 rounded-xl bg-white shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div>
                    <div className="w-full h-48 rounded-lg overflow-hidden bg-[#f3f3f3] mb-3 relative">
                      <img
                        alt={kit.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={kit.image}
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/90 text-[10px] font-bold text-black uppercase backdrop-blur-sm shadow-sm">
                        {kit.category}
                      </span>
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold text-black">{kit.title}</h3>
                        <p className="text-xs text-[#585f6c] mt-0.5">{kit.description}</p>
                      </div>
                      <span className="text-sm font-bold text-black">
                        ₹{kit.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddCareKit(kit)}
                    className={`mt-4 w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                      isAdded
                        ? 'bg-black text-white'
                        : 'bg-[#f3f3f3] hover:bg-black hover:text-white text-black'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isAdded ? 'check' : 'add'}
                    </span>
                    <span>{isAdded ? 'Added ✓' : 'Add to Bag'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
      />
    </div>
  );
};
