import { FormSteps } from "@/components/form-steps"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Share } from "lucide-react"

export default function NewProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="container h-full mx-auto grid place-items-center">
      <Card>
        <CardHeader>
          <CardTitle>Multistep Form</CardTitle>
          <CardDescription>
            A simple multistep form using Next.js, React Hook Form, and Zod.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <FormSteps />

          {children}
        </CardContent>

        <Separator />

        <CardFooter>
          <Button variant="outline" size="sm">
            Share <Share className="ml-2 size-3.5" />
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
