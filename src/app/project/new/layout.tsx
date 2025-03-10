export default function NewProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="container h-full mx-auto grid place-items-center">
      {children}
    </main>
  )
}
