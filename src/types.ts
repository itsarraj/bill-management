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