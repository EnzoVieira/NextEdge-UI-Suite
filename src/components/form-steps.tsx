import Link from "next/link"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { cn } from "@/lib/utils"

export function FormSteps() {
  const isStep1Completed = true
  const isStep2Completed = false
  const isStep3Completed = false

  return (
    <div className="flex items-center">
      <Button
        className={cn("text-sm", {
          "text-muted-foreground": !isStep1Completed,
        })}
        variant="ghost"
        asChild
      >
        <Link href="/project/new/step-1">
          <span className="flex items-center justify-center size-4 rounded-full bg-black text-white">
            1
          </span>
          <span>Project Overview</span>
        </Link>
      </Button>

      <Separator className="shrink-1 data-[orientation=horizontal]:w-20" />

      <Button
        className={cn("text-sm", {
          "text-muted-foreground": !isStep2Completed,
        })}
        variant="ghost"
        asChild
      >
        <Link href="/project/new/step-2">
          <span
            className={cn(
              "flex items-center justify-center size-4 rounded-full ",
              {
                "bg-muted text-muted-foreground": !isStep2Completed,
              },
            )}
          >
            2
          </span>
          <span>Task Planning</span>
        </Link>
      </Button>

      <Separator className="shrink-1 data-[orientation=horizontal]:w-20" />

      <Button
        className={cn("text-sm", {
          "text-muted-foreground": !isStep3Completed,
        })}
        variant="ghost"
        asChild
      >
        <Link href="/project/new/step-3">
          <span
            className={cn(
              "flex items-center justify-center size-4 rounded-full ",
              {
                "bg-muted text-muted-foreground": !isStep3Completed,
              },
            )}
          >
            3
          </span>
          <span>Assign Project Lead</span>
        </Link>
      </Button>
    </div>
  )
}
