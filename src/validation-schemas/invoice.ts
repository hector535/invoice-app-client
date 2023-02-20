import { z } from "zod";
import isDate from "validator/es/lib/isDate";

const requiredObj = { message: "Required field" };
const maxLengthObj = (length: number) => ({
  message: `Max length: ${length} character(s)`,
});

const addressSchema = z.object({
  street: z.string().trim().min(1, requiredObj).max(100, maxLengthObj(100)),
  city: z.string().trim().min(1, requiredObj).max(50, maxLengthObj(50)),
  postCode: z.string().trim().min(1, requiredObj).max(20, maxLengthObj(20)),
  country: z.string().trim().min(1, requiredObj).max(50, maxLengthObj(50)),
});

export const invoiceSchema = z.object({
  createdAt: z
    .string()
    .refine((val: string) => isDate(val, { format: "YYYY-MM-DD" }), {
      message: "Invalid date",
    }),
  description: z.string().trim().min(1, requiredObj).max(50, maxLengthObj(50)),
  paymentTerms: z.number(),
  clientName: z.string().trim().min(1, requiredObj).max(50, maxLengthObj(50)),
  clientEmail: z.string().email(),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: z
    .object({
      name: z.string().trim().min(1, requiredObj).max(50, maxLengthObj(50)),
      quantity: z.number().gte(1).lte(999),
      price: z.number().positive().finite(),
      total: z.number(),
    })
    .array(),
});
