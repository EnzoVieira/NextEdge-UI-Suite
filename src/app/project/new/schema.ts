import { z } from "zod"

export const newProjectSchema = z.object({
  // step 1
  name: z
    .string({
      required_error: "Project name is required",
    })
    .min(3, {
      message: "Project name must be at least 3 characters",
    }),
  description: z
    .string({
      required_error: "Project description is required",
    })
    .min(10, {
      message: "Project description must be at least 10 characters",
    }),
  category: z.enum(["software", "marketing", "design", "strategy", "other"], {
    required_error: "Project category is required",
  }),

  // step 2
  tasks: z.array(
    z.object({
      name: z
        .string({ required_error: "Task name is required" })
        .min(3, { message: "Task name must be at least 3 characters" }),
      priority: z.enum(["low", "medium", "high"], {
        required_error: "Task priority is required",
      }),
      assignee: z.string().optional(),
    }),
  ),

  // step 3
  lead: z.string({
    required_error: "Project lead is required",
  }),
})

export type NewProjectSchema = z.infer<typeof newProjectSchema>
