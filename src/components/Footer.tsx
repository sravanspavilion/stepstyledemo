import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigateTo, openSizeModal, showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast('Thank you for subscribing to STEPSTYLE drops!');
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#ffffff] shadow-[0_-1px_8px_rgba(0,0,0,0.02)] pt-12 pb-8 border-t border-gray-100">
      <div className="w-full px-4 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
          {/* Col 1: Brand & Craft Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-headline text-[22px] font-bold tracking-tight text-[#000000] uppercase">
                STEPSTYLE
              </span>
            </div>
            <p className="text-[13px] text-[#444748] leading-relaxed max-w-sm">
              Engineered footwear and disciplined daily apparel. Bridging contemporary architectural balance with high-performance modern sportswear.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#444748]">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                100% Sustainable Packaging Certified
              </span>
            </div>
          </div>

          {/* Col 2: Shop Links */}
          <div className="space-y-2">
            <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#000000]">
              Shop
            </h3>
            <ul className="space-y-1 text-[13px] text-[#444748]">
              <li className="leading-loose">
                <button
                  onClick={() => navigateTo('catalog')}
                  className="hover:text-black transition-colors"
                >
                  Men's Footwear &amp; Apparel
                </button>
              </li>
              <li className="leading-loose">
                <button
                  onClick={() => navigateTo('catalog')}
                  className="hover:text-black transition-colors"
                >
                  Women's Footwear &amp; Apparel
                </button>
              </li>
              <li className="leading-loose">
                <button
                  onClick={() => navigateTo('catalog')}
                  className="hover:text-black transition-colors"
                >
                  Technical Sneakers
                </button>
              </li>
              <li className="leading-loose">
                <button
                  onClick={() => navigateTo('catalog')}
                  className="hover:text-black transition-colors"
                >
                  Everyday Uniform
                </button>
              </li>
              <li className="leading-loose">
                <button
                  onClick={() => navigateTo('catalog')}
                  className="hover:text-black transition-colors"
                >
                  Seasonal Drops
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-2">
            <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#000000]">
              Customer Care
            </h3>
            <ul className="space-y-1 text-[13px] text-[#444748]">
              <li className="leading-loose">
                <button
                  onClick={() => showToast('Order tracking concierge active: enter your order number on WhatsApp')}
                  className="hover:text-black transition-colors"
                >
                  Track Order
                </button>
              </li>
              <li className="leading-loose">
                <button
                  onClick={() => showToast('Express 48H delivery active across Indian Metros')}
                  className="hover:text-black transition-colors"
                >
                  Shipping &amp; Delivery
                </button>
              </li>
              <li className="leading-loose">
                <button
                  onClick={() => showToast('7-Day Doorstep pickup & Instant refunds supported')}
                  className="hover:text-black transition-colors"
                >
                  Returns &amp; Exchanges
                </button>
              </li>
              <li className="leading-loose">
                <button
                  onClick={() => openSizeModal()}
                  className="hover:text-black transition-colors underline font-medium"
                >
                  Footwear Sizing Guide
                </button>
              </li>
              <li className="leading-loose">
                <button
                  onClick={() => showToast('All silhouettes fit true to European/UK sizing')}
                  className="hover:text-black transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div className="space-y-2">
            <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#000000]">
              Connect
            </h3>
            <p className="text-[13px] text-[#444748]">
              Subscribe for early access to limited edition drops and archive sales.
            </p>
            <form onSubmit={handleJoin} className="flex items-center gap-1.5 pt-1">
              <input
                className="bg-[#f3f3f3] px-3.5 py-2.5 rounded-lg text-[13px] text-[#1a1c1c] placeholder:text-[#747878] w-full focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button
                className="bg-[#000000] text-[#ffffff] px-4 py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shrink-0"
                type="submit"
              >
                Join
              </button>
            </form>
            <div className="flex items-center gap-3 pt-2 text-[#444748]">
              <a
                href="#"
                onClick={e => { e.preventDefault(); showToast('Instagram: @stepstyle.atelier'); }}
                className="hover:text-black transition-colors p-1"
                aria-label="Instagram"
              >
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              </a>
              <a
                href="#"
                onClick={e => { e.preventDefault(); showToast('Twitter/X: @stepstyle'); }}
                className="hover:text-black transition-colors p-1"
                aria-label="Threads"
              >
                <span className="material-symbols-outlined text-[20px]">alternate_email</span>
              </a>
              <a
                href="#"
                onClick={e => { e.preventDefault(); showToast('Community Network Active'); }}
                className="hover:text-black transition-colors p-1"
                aria-label="Hub"
              >
                <span className="material-symbols-outlined text-[20px]">hub</span>
              </a>
              <a
                href="#"
                onClick={e => { e.preventDefault(); showToast('YouTube: STEPSTYLE Series'); }}
                className="hover:text-black transition-colors p-1"
                aria-label="YouTube"
              >
                <span className="material-symbols-outlined text-[20px]">smart_display</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-[#444748]">
          <div className="flex items-center gap-2">
            <span>© 2025 STEPSTYLE Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] tracking-wider font-semibold">
            <span className="px-2 py-0.5 rounded bg-[#eeeeee] text-[#1a1c1c]">VISA</span>
            <span className="px-2 py-0.5 rounded bg-[#eeeeee] text-[#1a1c1c]">MASTERCARD</span>
            <span className="px-2 py-0.5 rounded bg-[#eeeeee] text-[#1a1c1c]">UPI</span>
            <span className="px-2 py-0.5 rounded bg-[#eeeeee] text-[#1a1c1c]">RUPAY</span>
            <span className="px-2 py-0.5 rounded bg-[#eeeeee] text-[#1a1c1c]">APPLE PAY</span>
          </div>
          <div className="flex items-center gap-4 text-[12px]">
            <a
              href="#"
              onClick={e => { e.preventDefault(); showToast('Privacy Policy: No personal data sold. Compliant.'); }}
              className="hover:text-black transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              onClick={e => { e.preventDefault(); showToast('Terms: Authentic craft warranty & doorstep exchanges.'); }}
              className="hover:text-black transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
