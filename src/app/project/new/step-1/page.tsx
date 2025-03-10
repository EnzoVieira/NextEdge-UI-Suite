"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
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
})

type FormSchema = z.infer<typeof schema>

export default function NewProjectStep1() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormSchema) {
    console.log(data)
    router.push("/project/new/step-2")
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name..." {...field} />
              </FormControl>

              <FormDescription>
                A clear and concise name for your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Describe the project objectives, scope, and key details..."
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Provide a brief summary of the project, outlining its purpose
                and key goals.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Category</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category..." />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="software">Software Development</SelectItem>
                  <SelectItem value="marketing">Marketing Campaign</SelectItem>
                  <SelectItem value="design">Product Design</SelectItem>
                  <SelectItem value="strategy">Business Strategy</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <FormDescription>
                Choose the category that best describes the project&apos;s
                focus.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  )
}
