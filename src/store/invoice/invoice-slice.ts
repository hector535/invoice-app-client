import { InvoiceType } from "@/types/invoice";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

import data from "@/data/data.json";

interface InvoiceState {
  invoices: InvoiceType[];
}

const initialState: InvoiceState = {
  invoices: data as InvoiceType[],
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<InvoiceType>) => {
      state.invoices.push(action.payload);
    },
    update: (state, action: PayloadAction<InvoiceType>) => {
      state.invoices = state.invoices.map((i) => {
        return i.id === action.payload.id ? action.payload : i;
      });
    },
    remove: (state, action: PayloadAction<string>) => {
      state.invoices = state.invoices.filter((i) => i.id !== action.payload);
    },
    setToPaid: (state, action: PayloadAction<string>) => {
      state.invoices = state.invoices.map((i) => {
        if (i.id === action.payload) {
          return { ...i, status: "paid" };
        }

        return i;
      });
    },
  },
});

export const { add, update, remove, setToPaid } = invoiceSlice.actions;
export default invoiceSlice.reducer;
