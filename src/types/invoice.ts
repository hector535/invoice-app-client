export type StatusType = "paid" | "pending" | "draft";

export interface InvoiceType {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: StatusType;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
}

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export type InvoiceFormType = Omit<InvoiceType, "id" | "paymentDue" | "total">;
