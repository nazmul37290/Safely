import { z } from "zod";

const createMessageValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone is required"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
    status: z.enum(["Pending", "Replied"]).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const MessageValidations = {
  createMessageValidationSchema,
};
