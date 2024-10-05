import { z } from "zod";

export const commentValidationSchema = z.object({
  commentText: z
    .string()
    .trim()
    .min(1, "Comment must be at least 1 characters"),
});
