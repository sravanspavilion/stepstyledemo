import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, cartTotal, clearCart, showToast, isGift, deliveryNote } = useStore();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  
  // Shipping form state
  const [name, setName] = useState('Aakash Mehta');
  const [phone, setPhone] = useState('+91 98200 12345');
  const [address, setAddress] = useState('Flat 4B, Silver Oak Heights, Worli Sea Face');
  const [city, setCity] = useState('Mumbai');
  const [pincode, setPincode] = useState('400018');
  
  // Payment selection
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('aakash@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && address && pincode) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderId(`STP-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep('confirmed');
      clearCart();
      showToast('Order confirmed successfully!');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors rounded-full"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6 text-xs uppercase font-bold tracking-wider text-gray-500 border-b border-gray-100 pb-3">
          <span className={step === 'shipping' ? 'text-black' : 'text-gray-400'}>
            1. Shipping Address
          </span>
          <span>→</span>
          <span className={step === 'payment' ? 'text-black' : 'text-gray-400'}>
            2. Payment Details
          </span>
          <span>→</span>
          <span className={step === 'confirmed' ? 'text-emerald-600' : 'text-gray-400'}>
            3. Confirmation
          </span>
        </div>

        {step === 'shipping' && (
          <form onSubmit={handleShippingSubmit} className="space-y-4">
            <div>
              <h2 className="font-headline text-[20px] font-bold uppercase text-black">
                Shipping &amp; Delivery Details
              </h2>
              <p className="text-[13px] text-gray-500">
                Complimentary express 48H doorstep dispatch
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f3f3f3] text-sm text-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                    Mobile Phone (for OTP &amp; WhatsApp updates)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f3f3f3] text-sm text-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                    Postal Pincode
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={e => setPincode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f3f3f3] text-sm text-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                  Street Address / Flat / Floor
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f3f3f3] text-sm text-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                  City / State
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f3f3f3] text-sm text-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            {isGift && (
              <div className="p-3 bg-neutral-50 rounded-lg text-xs text-gray-600 border border-gray-200">
                🎁 <strong>Gift Packaging Active:</strong> Redacted price slip &amp; eco-luxe presentation.
              </div>
            )}

            {deliveryNote && (
              <div className="p-3 bg-neutral-50 rounded-lg text-xs text-gray-600 border border-gray-200">
                📝 <strong>Special Instruction:</strong> {deliveryNote}
              </div>
            )}

            <div className="pt-2 flex justify-between items-center">
              <span className="font-bold text-sm">
                Total to Pay: ₹{cartTotal.toLocaleString('en-IN')}
              </span>
              <button
                type="submit"
                className="py-3 px-6 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Continue to Payment →
              </button>
            </div>
          </form>
        )}

        {step === 'payment' && (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
              <h2 className="font-headline text-[20px] font-bold uppercase text-black">
                Select Payment Mode
              </h2>
              <p className="text-[13px] text-gray-500">
                256-bit Bank Grade Encrypted &amp; Verified
              </p>
            </div>

            <div className="space-y-2">
              <label
                onClick={() => setPaymentMethod('upi')}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-black bg-neutral-50 shadow-sm' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center border-black">
                    {paymentMethod === 'upi' && <span className="w-2 h-2 rounded-full bg-black"></span>}
                  </span>
                  <div>
                    <span className="font-bold text-sm block">UPI (GPay, PhonePe, Paytm)</span>
                    <span className="text-xs text-gray-500">Instant approval with zero surcharge</span>
                  </div>
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Fastest
                </span>
              </label>

              {paymentMethod === 'upi' && (
                <div className="p-3 bg-white rounded-lg border border-gray-200 space-y-2">
                  <label className="text-[11px] font-bold uppercase text-gray-600 block">
                    Enter UPI ID / VPA
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="username@bank"
                    className="w-full px-3 py-2 bg-[#f3f3f3] rounded-lg text-sm focus:outline-none"
                  />
                </div>
              )}

              <label
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-black bg-neutral-50 shadow-sm' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center border-black">
                    {paymentMethod === 'card' && <span className="w-2 h-2 rounded-full bg-black"></span>}
                  </span>
                  <div>
                    <span className="font-bold text-sm block">Credit / Debit Card</span>
                    <span className="text-xs text-gray-500">Visa, Mastercard, RuPay, Amex</span>
                  </div>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-black bg-neutral-50 shadow-sm' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center border-black">
                    {paymentMethod === 'cod' && <span className="w-2 h-2 rounded-full bg-black"></span>}
                  </span>
                  <div>
                    <span className="font-bold text-sm block">Cash on Delivery (Doorstep COD)</span>
                    <span className="text-xs text-gray-500">Pay via cash or UPI scan at delivery</span>
                  </div>
                </div>
              </label>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="text-xs uppercase font-bold text-gray-500 hover:text-black"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="py-3 px-6 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                    <span>Authorizing Payment...</span>
                  </>
                ) : (
                  <span>Authorize &amp; Pay ₹{cartTotal.toLocaleString('en-IN')}</span>
                )}
              </button>
            </div>
          </form>
        )}

        {step === 'confirmed' && (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Order Confirmed
              </span>
              <h2 className="font-headline text-[24px] font-bold text-black uppercase">
                Thank You for Choosing STEPSTYLE
              </h2>
              <p className="text-sm text-gray-600">
                Order Tracking ID: <strong className="font-mono text-black">{orderId}</strong>
              </p>
            </div>

            <div className="p-4 bg-[#f3f3f3] rounded-xl text-left text-xs space-y-1.5 text-gray-700 max-w-md mx-auto">
              <div className="flex justify-between">
                <span>Shipping To:</span>
                <span className="font-bold">{name}</span>
              </div>
              <div className="flex justify-between">
                <span>Destination:</span>
                <span className="font-bold">{city} ({pincode})</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Arrival:</span>
                <span className="font-bold text-emerald-800">Friday, 28 Feb (48H Express)</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="font-bold uppercase">{paymentMethod}</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onClose}
                className="py-3 px-8 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
