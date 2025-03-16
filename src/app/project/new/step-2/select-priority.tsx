import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { assignees } from "./constants"
import { FormControl } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { ControllerRenderProps } from "react-hook-form"
import { z } from "zod"
import { newProjectSchema } from "../schema"

type FieldType = { tasks: z.infer<typeof newProjectSchema>["tasks"] }

interface ISelectPriorityProps {
  field: ControllerRenderProps<FieldType, `tasks.${number}.assignee`>
}

export function SelectPriority({ field }: ISelectPriorityProps) {
  return (
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
              ? assignees.find((assignee) => assignee.value === field.value)
                  ?.label
              : "Select member"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search team member..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {assignees.map((assignee) => (
                <CommandItem
                  value={assignee.label}
                  key={assignee.value}
                  onSelect={() => {
                    field.onChange(assignee.value)
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
  )
}
