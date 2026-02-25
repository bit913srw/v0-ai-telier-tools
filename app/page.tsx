import { ToolsHeader } from "@/components/tools-header"
import { ToolsIndex } from "@/components/tools-index"
import { ToolsFooter } from "@/components/tools-footer"

export default function ToolsPage() {
  return (
    <main className="min-h-svh bg-background flex flex-col justify-between">
      <div className="w-full max-w-4xl mx-auto">
        <ToolsHeader />
        <ToolsIndex />
      </div>
      <ToolsFooter />
    </main>
  )
}
