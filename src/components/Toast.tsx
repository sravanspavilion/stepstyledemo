import React from 'react';
import { useStore } from '../context/StoreContext';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast.visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-black text-white shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
      <span className="material-symbols-outlined text-[20px] text-emerald-400">
        check_circle
      </span>
      <span className="text-xs font-medium text-white">{toast.message}</span>
    </div>
  );
};
