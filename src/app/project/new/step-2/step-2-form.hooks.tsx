import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { newProjectSchema } from "../schema"
import { z } from "zod"
import { useNewProjectStore } from "../store"
import { useEffect } from "react"

const schema = newProjectSchema.pick({
  tasks: true,
})

export type Step2FormSchema = z.infer<typeof schema>

export function useStep2Form() {
  const { resetField, ...form } = useForm({
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

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "tasks",
  })

  // fetch stored data
  const tasks = useNewProjectStore((state) => state.tasks)
  useEffect(() => {
    if (tasks) replace(tasks)
  }, [tasks])

  const formController = {
    ...form,
    resetField,
  }

  return { form: formController, fields, append, remove }
}
