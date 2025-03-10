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
import { newProjectSchema } from "../schema"
import { useNewProjectStore } from "../store"
import { useEffect } from "react"

const schema = newProjectSchema.pick({
  name: true,
  description: true,
  category: true,
})

type FormSchema = z.infer<typeof schema>

const initialState = {
  name: "",
  description: "",
  category: "software",
} as const

export default function NewProjectStep1() {
  const router = useRouter()

  const { setData, name, description } = useNewProjectStore((state) => state)

  const { reset, ...form } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...initialState },
  })

  useEffect(() => {
    reset((prevValues) => ({
      ...prevValues,
      ...(name && { name }),
      ...(description && { description }),
      // FIXME: category is not being set
      // ...(category && { category }),
    }))
  }, [reset, name, description])

  function onSubmit(data: FormSchema) {
    // FIXME: do not store category in local storage,
    // since it is not being fetched correctly
    setData({ name: data.name, description: data.description })
    router.push("/project/new/step-2")
  }

  function onClearForm() {
    useNewProjectStore.persist.clearStorage()
    reset(initialState)
  }

  return (
    <Form reset={reset} {...form}>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          <Button type="button" variant="outline" onClick={onClearForm}>
            Clear Form
          </Button>

          <Button className="ml-2" type="submit">
            Save & Continue
          </Button>
        </div>
      </form>
    </Form>
  )
}
