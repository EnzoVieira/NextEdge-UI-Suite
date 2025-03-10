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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { newProjectSchema } from "../schema"

const assignees = [
  { label: "Ada Lovelace", value: "ada-lovelace" },
  { label: "Alan Turing", value: "alan-turing" },
  { label: "Grace Hopper", value: "grace-hopper" },
  { label: "Margaret Hamilton", value: "margaret-hamilton" },
  { label: "Linus Torvalds", value: "linus-torvalds" },
  { label: "Tim Berners-Lee", value: "tim-berners-lee" },
]

const schema = newProjectSchema.pick({
  lead: true,
})

type FormSchema = z.infer<typeof schema>

export default function NewProjectStep3() {
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
          name="lead"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Project Lead</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
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
                              form.setValue("lead", assignee.value)
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

              <FormDescription>
                Assign a team member as the project lead.
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
