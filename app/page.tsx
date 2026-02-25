import { ToolsHeader } from "@/components/tools-header"
import { ToolsIndex } from "@/components/tools-index"
import { ToolsFooter } from "@/components/tools-footer"

export default function ToolsPage() {
  return (
    <main className="min-h-svh bg-background flex flex-col">
      <div className="w-full max-w-5xl mx-auto">
        <ToolsHeader />
      </div>
      <div className="flex-1 flex items-center justify-center w-full max-w-5xl mx-auto">
        <ToolsIndex />
      </div>
      <ToolsFooter />
    </main>
  )
}
