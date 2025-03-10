"use client"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown, Plus, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

const assignees = [
  { label: "Ada Lovelace", value: "ada-lovelace" },
  { label: "Alan Turing", value: "alan-turing" },
  { label: "Grace Hopper", value: "grace-hopper" },
  { label: "Margaret Hamilton", value: "margaret-hamilton" },
  { label: "Linus Torvalds", value: "linus-torvalds" },
  { label: "Tim Berners-Lee", value: "tim-berners-lee" },
]

const schema = z.object({
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
})

type FormSchema = z.infer<typeof schema>

export default function NewProjectStep2() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      tasks: [
        {
          name: "",
          priority: "low",
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tasks",
  })

  function onSubmit(data: FormSchema) {
    console.log(data)
    router.push("/project/new/step-3")
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
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Select priority..."
                          defaultValue={field.value}
                        />
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? assignees.find(
                                (assignee) => assignee.value === field.value,
                              )?.label
                            : "Select member"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search team member..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {assignees.map((assignee) => (
                              <CommandItem
                                value={assignee.label}
                                key={assignee.value}
                                onSelect={() => {
                                  // field.onChange(assignee.value)
                                  form.setValue(
                                    `tasks.${index}.assignee`,
                                    assignee.value,
                                  )
                                }}
                              >
                                {assignee.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    assignee.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="sm"
              variant="destructive"
              type="button"
              onClick={() => remove(index)}
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
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  )
}
