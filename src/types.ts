// src/types.ts
export interface User {
  email: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

export interface Product {
  name: string;
  quantity: number;
  price: number;
}

export interface Bill {
  id: string;
  customerName: string;
  customerMobile: string;
  customerAddress: string;
  billingDate: string;
  products: Product[];
  totalPrice: number;
}

export interface Customer {
  id: string;
  name: string;
  quantity: number;
  billingDate: string;
  contact: string;
  address: string;
  price: number;
}

export interface BillState {
  bills: Bill[];
}

export interface CustomerState {
  customers: Customer[];
}

export interface RootState {
  auth: AuthState;
  bill: BillState;
  customer: CustomerState;
}