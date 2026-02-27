import Link from "next/link"

const items = [
  {
    name: "INSPIRATION",
    description: "Your editorial image library",
    href: "/tools/inspiration",
    offsetY: 30,
  },
  {
    name: "MEASUREMENTS",
    description: "Log body profiles for AI",
    href: "/tools/measurements",
    offsetY: -110,
  },
  {
    name: "WORKING IDEAS",
    description: "Your design notebook",
    href: "/tools/ideas",
    offsetY: 20,
  },
]

export function ToolsIndex() {
  return (
    <nav className="px-6 md:px-12 py-8 md:py-12 w-full">
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:items-start md:gap-16 lg:gap-24">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group relative flex flex-col items-center md:[transform:var(--offset)]"
            style={{ "--offset": `translateY(${item.offsetY}px)` } as React.CSSProperties}
          >
            {/* Hairline bordered container */}
            <div className="relative flex flex-col items-center justify-center w-[200px] h-[120px] md:w-[190px] md:h-[110px] lg:w-[220px] lg:h-[130px] border-2 border-primary transition-all duration-500 group-hover:border-primary">
              {/* Thin accent line at top */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-primary transition-all duration-500 group-hover:w-full"
                style={{ width: "30%" }}
                aria-hidden="true"
              />

              {/* Title */}
              <span className="font-mono text-base md:text-lg lg:text-xl tracking-[0.15em] text-foreground uppercase text-center font-medium">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  )
}
