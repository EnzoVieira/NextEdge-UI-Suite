import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { newProjectSchema } from "../schema"
import { z } from "zod"

const schema = newProjectSchema.pick({
  tasks: true,
})

export type Step2FormSchema = z.infer<typeof schema>

export function useStep2Form() {
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

  return { form, fields, append, remove }
}
