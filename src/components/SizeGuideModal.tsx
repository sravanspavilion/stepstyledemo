import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const SizeGuideModal: React.FC = () => {
  const { sizeModalOpen, sizeModalProduct, closeSizeModal, addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState('UK 9');

  if (!sizeModalOpen) return null;

  const product = sizeModalProduct || PRODUCTS[0];

  const handleConfirm = () => {
    addToCart(product, selectedSize, product.colors[0]?.name || 'Standard');
    closeSizeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
        <button
          onClick={closeSizeModal}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black transition-colors rounded-full"
          type="button"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="space-y-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#585f6c] font-bold block mb-1">
              Quick Selection &amp; Size Matrix
            </span>
            <h3 className="font-headline text-[20px] font-bold uppercase text-black">
              {product.title}
            </h3>
            <p className="text-[13px] text-[#444748]">
              True to standard European sizing. For wider feet, consider sizing up.
            </p>
          </div>

          {/* Footwear Conversion Table */}
          <div className="rounded-xl overflow-hidden bg-[#f3f3f3] p-3">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="text-[#585f6c] text-[10px] uppercase tracking-wider border-b border-gray-200 font-bold">
                  <th className="py-2">UK / India</th>
                  <th className="py-2">EU</th>
                  <th className="py-2">US</th>
                  <th className="py-2">Foot Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/60 text-gray-700">
                <tr className={selectedSize === 'UK 7' ? 'bg-white font-bold' : ''}>
                  <td className="py-1.5 font-bold">UK 7</td>
                  <td>41</td>
                  <td>8.0</td>
                  <td>25.8 cm</td>
                </tr>
                <tr className={selectedSize === 'UK 8' ? 'bg-white font-bold' : ''}>
                  <td className="py-1.5 font-bold">UK 8</td>
                  <td>42</td>
                  <td>9.0</td>
                  <td>26.6 cm</td>
                </tr>
                <tr className={selectedSize === 'UK 9' ? 'bg-white font-bold' : ''}>
                  <td className="py-1.5 font-bold">UK 9</td>
                  <td>43</td>
                  <td>10.0</td>
                  <td>27.5 cm</td>
                </tr>
                <tr className={selectedSize === 'UK 10' ? 'bg-white font-bold' : ''}>
                  <td className="py-1.5 font-bold">UK 10</td>
                  <td>44</td>
                  <td>11.0</td>
                  <td>28.3 cm</td>
                </tr>
                <tr className={selectedSize === 'UK 11' ? 'bg-white font-bold' : ''}>
                  <td className="py-1.5 font-bold">UK 11</td>
                  <td>45</td>
                  <td>12.0</td>
                  <td>29.1 cm</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Select Active Size */}
          <div className="space-y-2">
            <label className="text-[12px] font-bold uppercase tracking-wider text-black block">
              Choose Your Size:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'].map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  type="button"
                  className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    selectedSize === sz
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-[#eeeeee] hover:bg-black hover:text-white text-gray-800'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleConfirm}
              type="button"
              className="flex-1 py-3.5 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span>Confirm &amp; Add to Bag (₹{product.price.toLocaleString('en-IN')})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
