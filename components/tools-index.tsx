import Link from "next/link"

const items = [
  {
    name: "INSPIRATION",
    description: "Your editorial image library",
    href: "/tools/inspiration",
  },
  {
    name: "MEASUREMENTS",
    description: "Log body profiles for AI",
    href: "/tools/measurements",
  },
  {
    name: "WORKING IDEAS",
    description: "Your design notebook",
    href: "/tools/ideas",
  },
]

export function ToolsIndex() {
  return (
    <nav className="px-6 md:px-12 py-8 md:py-12 w-full">
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-10 lg:gap-14">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group relative flex items-center justify-center w-[220px] h-[140px] md:w-[210px] md:h-[130px] lg:w-[240px] lg:h-[150px] transition-all duration-300 hover:-translate-y-1"
          >
            {/* Outer shadow for 3D depth */}
            <div
              className="absolute inset-0 rounded-[50%] transition-all duration-300 group-hover:translate-y-1"
              aria-hidden="true"
              style={{
                background: "rgba(0,0,0,0.25)",
                filter: "blur(12px)",
                transform: "translateY(8px) scaleX(0.95)",
              }}
            />

            {/* Oval body with 3D gradient */}
            <div
              className="absolute inset-0 rounded-[50%] transition-all duration-300 group-hover:scale-[1.03]"
              aria-hidden="true"
              style={{
                background: `
                  radial-gradient(
                    ellipse at 35% 30%,
                    #b02828 0%,
                    #8B1A1A 35%,
                    #6e1313 70%,
                    #4a0e0e 100%
                  )
                `,
                boxShadow: `
                  inset -4px -6px 12px rgba(0,0,0,0.3),
                  inset 3px 4px 10px rgba(255,255,255,0.08),
                  0 2px 6px rgba(0,0,0,0.2)
                `,
              }}
            />

            {/* Specular highlight */}
            <div
              className="absolute rounded-[50%] pointer-events-none"
              aria-hidden="true"
              style={{
                top: "14%",
                left: "18%",
                width: "45%",
                height: "30%",
                background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)",
                transform: "rotate(-12deg)",
              }}
            />

            {/* Text */}
            <div className="relative z-10 flex flex-col items-center gap-1.5 px-6">
              <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-primary-foreground uppercase font-bold text-center">
                {item.name}
              </span>
              <span className="font-mono text-[10px] md:text-xs tracking-[0.08em] text-primary-foreground/60 italic text-center">
                {item.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  )
}
