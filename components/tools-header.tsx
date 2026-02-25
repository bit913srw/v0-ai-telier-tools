import Link from "next/link"

export function ToolsHeader() {
  return (
    <header className="px-6 pt-8 pb-0 md:px-12 md:pt-12">
      <div className="flex items-center justify-between mb-10">
        <Link
          href="/"
          className="font-mono text-xs tracking-[0.25em] uppercase text-primary hover:opacity-70 transition-opacity"
        >
          {"← STUDIO"}
        </Link>
        <div className="w-16" />
      </div>

      <h1 className="text-center font-sans text-5xl md:text-7xl font-bold tracking-[0.08em] text-primary uppercase mb-8">
        TOOLS
      </h1>

      <div className="w-full h-px bg-primary" />
    </header>
  )
}
