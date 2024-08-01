import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters." })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter.",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Password must contain at least one special character.",
  });

const scheduleSchema = z.object({
  single_date: z
    .object({
      start_date: z.string(),
      end_date: z.string(),
    })
    .optional(),
  multiple_date_ranges: z.array(z.string()).optional(),
  recurring_days_of_week: z.array(z.string()).optional(),
  recurring_start_date: z.string().optional(),
  recurring_end_date: z.string().optional(),
  schedule_type: z.string(),
});

export const listItemFormSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  category_id: z.string().min(1, "Product name is required"),
  sub_category_id: z.number().int().optional(),
  item_location: z.string().min(1, "Item location is required"),
  description: z.string().min(1, "Description is required"),
  quantity_available: z.number().int().min(1, "Quantity available is required"),
  estimated_value: z.number().min(1, "Estimated value is required"),
  price_per_day: z.number().min(1, "Price per day is required"),
  multiple_date_ranges: z.any().optional(),
  image: z.any().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  recurring_days_of_week: z.array(z.string()).optional(),
  recurring_end_date: z.date().optional(),
});
