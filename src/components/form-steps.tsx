"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { cn } from "@/lib/utils"
import { useNewProjectStore } from "@/app/project/new/store"
import { Check } from "lucide-react"
import { usePathname } from "next/navigation"

export function FormSteps() {
  const pathname = usePathname()

  const name = useNewProjectStore((state) => state.name)
  const description = useNewProjectStore((state) => state.description)
  const tasks = useNewProjectStore((state) => state.tasks)

  const isStep1Completed = name && description
  const isStep1Active = pathname === "/project/new/step-1"

  // at least one task is required
  // and all tasks have a name and priority
  const allTasksFilled = tasks?.every((task) =>
    Boolean(task.name && task.priority),
  )
  const isStep2Completed = !!tasks?.length && allTasksFilled
  const isStep2Active = pathname === "/project/new/step-2"

  const isStep3Completed = false
  const isStep3Active = pathname === "/project/new/step-3"

  return (
    <div className="flex items-center">
      <Button
        className={cn("text-sm", {
          "text-muted-foreground": !isStep1Completed && !isStep1Active,
        })}
        variant="ghost"
        asChild
      >
        <Link href="/project/new/step-1">
          <span
            className={cn(
              "flex items-center justify-center size-4 rounded-full",
              {
                "bg-muted": !isStep1Completed,
                "bg-black text-white": isStep1Completed || isStep1Active,
              },
            )}
          >
            {isStep1Completed ? <Check className="size-3" /> : 1}
          </span>
          <span>Project Overview</span>
        </Link>
      </Button>

      <Separator className="shrink-1 data-[orientation=horizontal]:w-20" />

      <Button
        className={cn("text-sm", {
          "text-muted-foreground": !isStep2Completed && !isStep2Active,
        })}
        variant="ghost"
        asChild
      >
        <Link href="/project/new/step-2">
          <span
            className={cn(
              "flex items-center justify-center size-4 rounded-full",
              {
                "bg-muted": !isStep2Completed,
                "bg-black text-white": isStep2Completed || isStep2Active,
              },
            )}
          >
            {isStep2Completed ? <Check className="size-3" /> : 2}
          </span>
          <span>Task Planning</span>
        </Link>
      </Button>

      <Separator className="shrink-1 data-[orientation=horizontal]:w-20" />

      <Button
        className={cn("text-sm", {
          "text-muted-foreground": !isStep3Completed && !isStep3Active,
        })}
        variant="ghost"
        asChild
      >
        <Link href="/project/new/step-3">
          <span
            className={cn(
              "flex items-center justify-center size-4 rounded-full",
              {
                "bg-muted": !isStep3Completed,
                "bg-black text-white": isStep3Completed || isStep3Active,
              },
            )}
          >
            {isStep3Completed ? <Check className="size-3" /> : 3}
          </span>
          <span>Assign Project Lead</span>
        </Link>
      </Button>
    </div>
  )
}
