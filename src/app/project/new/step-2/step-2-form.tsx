"use client"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
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

import { Step2FormSchema, useStep2Form } from "./step-2-form.hooks"
import { useRouter } from "next/navigation"
import { Plus, X } from "lucide-react"
import { SelectPriority } from "./select-priority"
import { useNewProjectStore } from "../store"

export function Step2Form() {
  const router = useRouter()

  const setData = useNewProjectStore((state) => state.setData)
  const { form, fields, append, remove } = useStep2Form()

  function onSubmit(data: Step2FormSchema) {
    setData(data)
    router.push("/project/new/step-3")
  }

  function onRemoveTask(index: number) {
    // remove from store
    const tasks = form.getValues("tasks")
    const newTasks = tasks.filter((_, i) => i !== index)
    setData({ tasks: newTasks })
    // remove from form
    remove(index)
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <FormField
              control={form.control}
              name={`tasks.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`tasks.${index}.priority`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Priority</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select priority..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`tasks.${index}.assignee`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Assign to</FormLabel>
                  <SelectPriority field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="sm"
              variant="destructive"
              type="button"
              onClick={() => onRemoveTask(index)}
            >
              Remove Task
              <X className="ml-2 size-3.5" />
            </Button>
          </div>
        ))}

        <Button
          size="sm"
          variant="outline"
          type="button"
          onClick={() =>
            append({
              name: "",
              priority: "low",
            })
          }
        >
          Add Task
          <Plus className="ml-2 size-3.5" />
        </Button>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/project/new/step-1")}
          >
            Go back
          </Button>

          <Button className="ml-2" type="submit">
            Save & Continue
          </Button>
        </div>
      </form>
    </Form>
  )
}
