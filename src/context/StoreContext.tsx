import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ScreenView, FilterState } from '../types';
import { PRODUCTS, APPAREL_ITEMS } from '../data/products';

interface StoreContextType {
  currentView: ScreenView;
  selectedProductId: string;
  navigateTo: (view: ScreenView, productId?: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  addApparelOrKitToCart: (title: string, price: number, originalPrice: number, image: string, size?: string, color?: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  appliedPromo: string | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  isGift: boolean;
  setIsGift: (val: boolean) => void;
  deliveryNote: string;
  setDeliveryNote: (val: string) => void;
  sizeModalOpen: boolean;
  sizeModalProduct: Product | null;
  openSizeModal: (product?: Product) => void;
  closeSizeModal: () => void;
  toast: { message: string; visible: boolean };
  showToast: (message: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  catalogFilters: FilterState;
  setCatalogFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetCatalogFilters: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  promoDiscount: number;
  cartTotal: number;
  cartCount: number;
}

const initialFilters: FilterState = {
  category: 'All Footwear',
  gender: ['Men'],
  silhouette: ['Sneakers'],
  sizes: ['UK 9'],
  colors: [],
  materials: [],
  minPrice: 999,
  maxPrice: 4999,
  inStockOnly: true,
  minRating: 4.0,
  searchQuery: '',
  sortBy: 'recommended'
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ScreenView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('classic-minimalist');
  
  // Initial items in cart matching Screen 4 (Bag with 2 items)
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: PRODUCTS[0],
      selectedColor: 'Chalk White / Natural Gum',
      selectedSize: 'UK 9 (Men)',
      quantity: 1
    },
    {
      id: 'cart-init-2',
      product: {
        id: 'heavy-linen-field-overshirt',
        sku: 'STS-SHIRT-02',
        title: 'Heavy Linen Field Overshirt',
        subtitle: 'Structured drape, pre-washed for zero shrinkage',
        category: 'Low-Top',
        gender: 'Men',
        silhouette: 'Sneakers',
        material: 'Heavy Organic Canvas',
        price: 2199,
        originalPrice: 2899,
        discountBadge: 'Saved ₹700',
        rating: 4.88,
        reviewsCount: 380,
        inStock: true,
        stockNote: 'Low Stock • Only 3 pieces left in UK Warehouse',
        description: 'Structured drape, pre-washed for zero shrinkage and maximum breathability.',
        heroImage: APPAREL_ITEMS[0].image,
        galleryImages: [],
        colors: [{ name: 'Olive Moss', hex: '#4a5840' }],
        sizes: ['S', 'M', 'L', 'XL']
      },
      selectedColor: 'Olive Moss',
      selectedSize: 'L (Regular Fit)',
      quantity: 1
    }
  ]);

  const [wishlist, setWishlist] = useState<string[]>(['classic-minimalist', 'aeroglide-running']);
  const [appliedPromo, setAppliedPromo] = useState<string | null>('FIRSTSTEP10');
  const [isGift, setIsGift] = useState<boolean>(false);
  const [deliveryNote, setDeliveryNote] = useState<string>('');
  
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [sizeModalProduct, setSizeModalProduct] = useState<Product | null>(null);

  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [searchQuery, setSearchQuery] = useState('');
  const [catalogFilters, setCatalogFilters] = useState<FilterState>(initialFilters);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2800);
  };

  const navigateTo = (view: ScreenView, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity
        }
      ];
    });
    showToast(`${product.title} (${size}) added to bag`);
  };

  const addApparelOrKitToCart = (
    title: string,
    price: number,
    originalPrice: number,
    image: string,
    size = 'Standard Fit',
    color = 'Neutral'
  ) => {
    const fakeProduct: Product = {
      id: `addon-${Date.now()}`,
      sku: `STS-ACC-${Math.floor(Math.random() * 900 + 100)}`,
      title,
      subtitle: 'Curated Wardrobe & Care Essential',
      category: 'Low-Top',
      gender: 'Men',
      silhouette: 'Sneakers',
      material: 'Italian Calfskin',
      price,
      originalPrice,
      discountBadge: `${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF`,
      rating: 4.9,
      reviewsCount: 120,
      inStock: true,
      description: 'Carefully engineered companion piece.',
      heroImage: image,
      galleryImages: [],
      colors: [{ name: color, hex: '#111111' }],
      sizes: [size]
    };

    setCart(prev => [
      ...prev,
      {
        id: `addon-item-${Date.now()}`,
        product: fakeProduct,
        selectedColor: color,
        selectedSize: size,
        quantity: 1
      }
    ]);
    showToast(`${title} added to bag`);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (itemId: string) => {
    const item = cart.find(c => c.id === itemId);
    setCart(prev => prev.filter(c => c.id !== itemId));
    if (item) {
      showToast(`Removed ${item.product.title} from bag`);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Wishlist');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FIRSTSTEP10' || clean === 'STEPSTYLE10' || clean === 'WELCOME10') {
      setAppliedPromo(clean);
      showToast('10% Welcome Discount applied!');
      return { success: true, message: '10% Welcome Discount applied' };
    }
    if (clean === 'SPRING25') {
      setAppliedPromo(clean);
      showToast('15% Spring Drop Discount applied!');
      return { success: true, message: '15% Spring Drop Discount applied' };
    }
    return { success: false, message: 'Invalid promo code' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast('Promo code removed');
  };

  const openSizeModal = (product?: Product) => {
    setSizeModalProduct(product || PRODUCTS[0]);
    setSizeModalOpen(true);
  };

  const closeSizeModal = () => {
    setSizeModalOpen(false);
  };

  const resetCatalogFilters = () => {
    setCatalogFilters(initialFilters);
    showToast('Filters reset to default');
  };

  // Price computations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
  const cartTotalCurrentPrices = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = cartSubtotal - cartTotalCurrentPrices;
  
  let promoDiscount = 0;
  if (appliedPromo === 'FIRSTSTEP10' || appliedPromo === 'WELCOME10') {
    promoDiscount = Math.round(cartTotalCurrentPrices * 0.1);
  } else if (appliedPromo === 'SPRING25') {
    promoDiscount = Math.round(cartTotalCurrentPrices * 0.15);
  }

  const cartTotal = Math.max(0, cartTotalCurrentPrices - promoDiscount);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        currentView,
        selectedProductId,
        navigateTo,
        cart,
        addToCart,
        addApparelOrKitToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        appliedPromo,
        applyPromo,
        removePromo,
        isGift,
        setIsGift,
        deliveryNote,
        setDeliveryNote,
        sizeModalOpen,
        sizeModalProduct,
        openSizeModal,
        closeSizeModal,
        toast,
        showToast,
        searchQuery,
        setSearchQuery,
        catalogFilters,
        setCatalogFilters,
        resetCatalogFilters,
        cartSubtotal,
        cartDiscount,
        promoDiscount,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
