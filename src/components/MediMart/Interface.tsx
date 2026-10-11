interface Generic {
  _id?: string;
  title?: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface Manufacturer {
  _id?: string;
  title?: string;
  address?: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
export interface Product {
  _id?: string;
  title?: string;
  generic?: Generic;
  manufacturer?: Manufacturer;
  type?: string;
  dosage_form?: string;
  strength?: string;
  mrp?: number;
  discount_price?: number;
  product_details?: string;
  images?: string[];
  isActive?: boolean;
}

interface ProductImage {
  url?: string;
}
interface brand {
  title: string;
}
export interface MediProductInterface {
  _id?: string;
  title?: string;
  category?: string;
  brand?: brand;
  new_arrival_home?: boolean;
  weekly_offer_home?: boolean;
  new_arrival?: boolean;
  weekly_offer?: boolean;
  in_stock?: number;
  mrp?: any;
  discount_price?: number;
  discount?: number;
  sales_count?: number;
  product_details?: string;
  images?: ProductImage[]; // Optional to handle undefined cases
}
export interface VitaminInterface {
  _id?: string;
  title?: string;
  discount_price?: string;
  mrp?: number;
  image?: ProductImage[];
  manufacturer?: string;
}

export interface addressDetails {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  district?: string;
  thana?: string;
  postalCode?: string | number;
  isDefault?: boolean;
  isHome?: boolean;
  user?: string;
}

export interface Item {
  _id: string;
  title?: string;
  brand?: string | undefined;
  generic?: string;
  mrp?: number;
  quantity?: number;
  itemCost?: number;
  itemType?: string;
  image?: string;
}

interface ProductVariation {
  _id?: number;
  product_id?: number;
  product_type?: string;
  pack_type?: string;
  pack_quantity?: string;
  pack_price?: string;
  availability?: boolean;
  status?: boolean;
  permanent_stock_out?: boolean;
  discount_percentage?: number;
  stock_quantity?: number;
  expire_date?: string;
  bk_prod_id?: string;
}

export interface NewProduct {
  _id?: string;
  product_id?: number;
  product_name?: string;
  is_stock?: boolean;
  price?: string;
  generic_name?: string;
  company_name?: string;
  type?: string;
  otc?: string;
  packsize?: string;
  updated_at?: string;
  images?: string;
  parent_category_id?: number;
  parent_category_name?: string;
  product_variations?: ProductVariation[];
  origin?: string;
  discount_percentage?: number;
  quantity?: number;
  itemCost?: number;
  itemType?: string;
  category_name?: string;
  category_id?: string;
  medicineVariation?: string;
  mrp?: string;
  product_slug?: string;
}

export interface Category {
  _id: string;
  category_id: number;
  category_name: string;
  parent_category: string;
  __v: number;
}

export interface ParentCategory {
  _id: string;
  parent_category_id: number;
  parent_category_name: string;
  __v: number;
  categories: Category[];
  id: string;
}

export interface ProductPack {
  id?: number;
  product_id?: number;
  product_type?: string;
  pack_type?: string;
  pack_quantity?: string;
  pack_price?: string;
  availability?: boolean;
  status?: boolean;
  permanent_stock_out?: boolean;
  discount_percentage?: number;
  stock_quantity?: number | null;
  expire_date?: string | null;
  bk_prod_id?: number;
  _id?: string;
}
