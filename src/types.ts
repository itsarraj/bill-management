// Define the Product interface
export interface Product {
  name: string;
  quantity: number;
  price: number;
}

// Define the Customer interface
export interface Customer {
  id: string;
  name: string;
  quantity: number;
  billingDate: string;
  contact: string;
  address: string;
  price: number;
}

// Define the Bill interface
export interface Bill {
  id: string;
  customerName: string;
  customerMobile: string;
  customerAddress: string;
  billingDate: string;
  products: Product[];
  totalPrice: number;
}

// Define Redux state interfaces
export interface AuthState {
  isLoggedIn: boolean;
  user: { email: string } | null;
}

export interface CustomerState {
  customers: Customer[];
}

export interface BillState {
  bills: Bill[];
}

export interface RootState {
  auth: AuthState;
  customer: CustomerState;
  bill: BillState;
}