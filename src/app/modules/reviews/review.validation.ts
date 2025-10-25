import { z } from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name should be a string",
    }),
    personType: z.enum(["Student", "Parents"], {
      required_error: "Person type is required",
      invalid_type_error: "Person type must be either 'Student' or 'Parents'",
    }),
    image: z
      .string({
        invalid_type_error: "Image must be a string",
      })
      .optional(),
    message: z.string({
      required_error: "Message is required",
      invalid_type_error: "Message should be a string",
    }),
  }),
});

const updateReviewValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name should be a string",
      })
      .optional(),
    personType: z
      .enum(["Student", "Parents"], {
        invalid_type_error: "Person type must be either 'Student' or 'Parents'",
      })
      .optional(),
    image: z
      .string({
        invalid_type_error: "Image must be a string",
      })
      .optional(),
    message: z
      .string({
        invalid_type_error: "Message should be a string",
      })
      .optional(),
  }),
});

export const ReviewValidations = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
