import Link from "next/link"

const notes = [
  {
    name: "INSPIRATION",
    description: "Your editorial image library",
    href: "/tools/inspiration",
    rotate: "-3deg",
    translateY: "0px",
  },
  {
    name: "MEASUREMENTS",
    description: "Log body profiles for AI",
    href: "/tools/measurements",
    rotate: "1.5deg",
    translateY: "4px",
  },
  {
    name: "WORKING IDEAS",
    description: "Your design notebook",
    href: "/tools/ideas",
    rotate: "-1deg",
    translateY: "-2px",
  },
]

export function ToolsIndex() {
  return (
    <nav className="px-6 md:px-12 py-12 md:py-20">
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-10 lg:gap-14">
        {notes.map((note) => (
          <Link
            key={note.name}
            href={note.href}
            className="group relative block w-full max-w-[240px] md:max-w-[220px] lg:max-w-[240px]"
            style={{
              transform: `rotate(${note.rotate}) translateY(${note.translateY})`,
            }}
          >
            {/* Shadow layer */}
            <div
              className="absolute inset-0 bg-foreground/10 translate-y-2 translate-x-1"
              style={{ filter: "blur(8px)" }}
              aria-hidden="true"
            />

            {/* Sticky note body */}
            <div className="sticky-note relative bg-primary px-6 py-8 md:px-7 md:py-10 flex flex-col items-start gap-3 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1">
              <h2 className="font-sans text-lg md:text-xl font-bold tracking-[0.14em] text-primary-foreground uppercase leading-tight">
                {note.name}
              </h2>
              <p className="font-mono text-xs md:text-sm text-primary-foreground/75 italic leading-relaxed">
                {note.description}
              </p>
            </div>

          </Link>
        ))}
      </div>
    </nav>
  )
}
