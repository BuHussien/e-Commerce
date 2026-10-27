import { z } from "zod";

const titleSchema = z
  .string()
  .trim()
  .min(2, "Title must be at least 2 characters");

const priceSchema = z
  .string()
  .trim()
  .min(1, "Price is required")
  .refine(
    (value) => Number.isFinite(Number(value)) && Number(value) > 0,
    "Price must be greater than 0"
  );

const descriptionSchema = z
  .string()
  .trim()
  .min(1, "Description is required");

export const addProductSchema = z.object({
  title: titleSchema,
  price: priceSchema,
  cat_prefix: z.string().trim().min(1, "Category is required"),
  img: z.string().trim().min(1, "Image is required"),
  description: descriptionSchema,
});

export const editProductSchema = z.object({
  title: titleSchema,
  price: priceSchema,
  description: descriptionSchema,
});

export type AddProductFormValues = z.infer<
  typeof addProductSchema
>;

export type EditProductFormValues = z.infer<
  typeof editProductSchema
>;