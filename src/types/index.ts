export type Category = 'All Footwear' | 'Low-Top' | 'High-Top' | 'Running' | 'Loafers' | 'Slides';

export type Gender = 'Men' | 'Women' | 'Unisex Standard';

export type Silhouette = 
  | 'Sneakers' 
  | 'Penny Loafers' 
  | 'Running Trainers' 
  | 'Everyday Slides' 
  | 'Chelsea Boots';

export type Material = 
  | 'Italian Calfskin' 
  | 'Breathable Supima Mesh' 
  | 'Heavy Organic Canvas' 
  | 'High-Rebound EVA Foam';

export interface ProductColor {
  name: string;
  hex: string;
  subHex?: string;
  image?: string;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  subtitle: string;
  category: Category;
  gender: Gender;
  silhouette: Silhouette;
  material: Material;
  price: number;
  originalPrice: number;
  discountBadge: string;
  badge?: 'BESTSELLER' | 'NEW' | 'LIMITED' | 'HOT' | 'TRENDING' | '#1 FOOTWEAR' | 'ALL DAY FIT' | 'NEW DROP' | 'PREMIUM';
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockNote?: string;
  description: string;
  heroImage: string;
  galleryImages: { label: string; url: string; alt: string }[];
  colors: ProductColor[];
  sizes: string[];
  outOfStockSizes?: string[];
  trending?: boolean;
  featured?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export type ScreenView = 'home' | 'catalog' | 'pdp' | 'cart';

export interface FilterState {
  category: Category;
  gender: Gender[];
  silhouette: Silhouette[];
  sizes: string[];
  colors: string[];
  materials: Material[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  minRating: number;
  searchQuery: string;
  sortBy: 'recommended' | 'price-low' | 'price-high' | 'rating' | 'newest';
}
