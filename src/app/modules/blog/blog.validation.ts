import { z } from "zod";

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title should be a string",
    }),
    slug: z.string({
      required_error: "Slug is required",
      invalid_type_error: "Slug should be a string",
    }),
    content: z.string({
      required_error: "Content is required",
      invalid_type_error: "Content should be a string",
    }),
    featuredImage: z
      .string({
        invalid_type_error: "Featured image must be a string",
      })
      .optional(),
    category: z
      .string({
        invalid_type_error: "Category must be a string",
      })
      .optional(),
    tags: z
      .array(z.string({ invalid_type_error: "Each tag must be a string" }))
      .optional(),
    author: z.object({
      id: z.string({
        required_error: "Author ID is required",
        invalid_type_error: "Author ID must be a string",
      }),
      name: z.string({
        required_error: "Author name is required",
        invalid_type_error: "Author name must be a string",
      }),
      avatar: z
        .string({
          invalid_type_error: "Avatar must be a string",
        })
        .optional(),
    }),
    status: z.enum(["Published", "Draft"]).default("Draft"),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title should be a string",
      })
      .optional(),
    slug: z
      .string({
        required_error: "Slug is required",
        invalid_type_error: "Slug should be a string",
      })
      .optional(),
    content: z
      .string({
        required_error: "Content is required",
        invalid_type_error: "Content should be a string",
      })
      .optional(),
    featuredImage: z
      .string({
        invalid_type_error: "Featured image must be a string",
      })
      .optional(),
    category: z
      .string({
        invalid_type_error: "Category must be a string",
      })
      .optional(),
    tags: z
      .array(z.string({ invalid_type_error: "Each tag must be a string" }))
      .optional(),
    author: z.object({
      id: z
        .string({
          required_error: "Author ID is required",
          invalid_type_error: "Author ID must be a string",
        })
        .optional(),
      name: z
        .string({
          required_error: "Author name is required",
          invalid_type_error: "Author name must be a string",
        })
        .optional(),
      avatar: z
        .string({
          invalid_type_error: "Avatar must be a string",
        })
        .optional(),
    }),
    status: z.enum(["Published", "Draft"]).default("Draft").optional(),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
