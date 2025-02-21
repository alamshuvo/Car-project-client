import { z } from "zod";

export const billingAddressValidationSchema = z.object({
  customerName: z.string({ required_error: "Name is required!" }).min(1, { message: "Please enter a valid name!" }),
  customerAddress: z.string({ required_error: "Name is required!" }).min(1, { message: "Please enter a valid name!" }),
  customerPhone: z.string({ required_error: "Name is required!" }).regex(/^\+880\d{10}$/, 'Please enter a valid phone number!'),
  customerCity: z.string({ required_error: "Name is required!" }).min(1, { message: "Please enter a valid name!" }),
  customerPostCode: z.string({ required_error: "Name is required!" }).min(1, { message: "Please enter a valid name!" })
});
