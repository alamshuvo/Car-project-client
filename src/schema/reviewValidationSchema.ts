import { z } from "zod";

export const reviewValidationSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});
