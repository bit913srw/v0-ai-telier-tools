import Link from "next/link"

export function ToolsHeader() {
  return (
    <header className="px-6 pt-5 pb-0 md:px-12 md:pt-8">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="font-mono text-xs tracking-[0.25em] uppercase text-primary hover:opacity-70 transition-opacity"
        >
          {"← STUDIO"}
        </Link>
        <div className="w-16" />
      </div>

      <h1 className="text-center font-sans text-3xl md:text-5xl font-bold tracking-[0.08em] text-primary uppercase mb-5">
        TOOLS
      </h1>

      <div className="w-full h-px bg-primary" />
    </header>
  )
}
