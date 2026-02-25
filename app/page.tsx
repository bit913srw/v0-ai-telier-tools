import { ToolsHeader } from "@/components/tools-header"
import { ToolsIndex } from "@/components/tools-index"
import { ToolsFooter } from "@/components/tools-footer"

export default function ToolsPage() {
  return (
    <main className="min-h-svh bg-background flex flex-col justify-between max-w-3xl mx-auto">
      <div>
        <ToolsHeader />
        <ToolsIndex />
      </div>
      <ToolsFooter />
    </main>
  )
}
