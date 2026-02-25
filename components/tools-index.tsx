import Link from "next/link"

const notes = [
  {
    name: "INSPIRATION",
    description: "Your editorial image library",
    href: "/tools/inspiration",
    rotate: "-3.5deg",
    translateY: "0px",
    curlCorner: "bottom-right" as const,
    wrinkleVariant: 0,
  },
  {
    name: "MEASUREMENTS",
    description: "Log body profiles for AI",
    href: "/tools/measurements",
    rotate: "2deg",
    translateY: "6px",
    curlCorner: "bottom-left" as const,
    wrinkleVariant: 1,
  },
  {
    name: "WORKING IDEAS",
    description: "Your design notebook",
    href: "/tools/ideas",
    rotate: "-1.2deg",
    translateY: "-4px",
    curlCorner: "bottom-right" as const,
    wrinkleVariant: 2,
  },
]

/* SVG wrinkle patterns - each note gets unique crease lines */
const wrinklePatterns = [
  // Variant 0: diagonal crease from upper-left area
  <svg key="w0" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 240 260">
    <line x1="20" y1="60" x2="180" y2="85" stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" />
    <line x1="45" y1="140" x2="220" y2="155" stroke="rgba(0,0,0,0.04)" strokeWidth="0.6" />
    <line x1="10" y1="180" x2="100" y2="175" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
    <path d="M30,30 Q120,45 200,25" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.2" />
    <path d="M0,120 Q80,115 160,130 T240,125" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
  </svg>,
  // Variant 1: horizontal creases, slightly rumpled
  <svg key="w1" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 240 260">
    <line x1="30" y1="90" x2="210" y2="95" stroke="rgba(0,0,0,0.05)" strokeWidth="0.7" />
    <line x1="15" y1="170" x2="200" y2="165" stroke="rgba(0,0,0,0.04)" strokeWidth="0.6" />
    <path d="M5,50 Q60,40 130,55 T240,45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
    <path d="M0,200 Q100,195 180,210 T240,200" fill="none" stroke="rgba(0,0,0,0.035)" strokeWidth="0.8" />
    <line x1="60" y1="30" x2="190" y2="40" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />
  </svg>,
  // Variant 2: subtle cross-creases
  <svg key="w2" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 240 260">
    <path d="M20,70 Q100,60 220,80" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.7" />
    <path d="M0,150 Q120,140 240,160" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="0.6" />
    <line x1="140" y1="10" x2="120" y2="250" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
    <path d="M10,220 Q80,210 160,225 T240,215" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />
    <line x1="40" y1="110" x2="200" y2="105" stroke="rgba(0,0,0,0.035)" strokeWidth="0.6" />
  </svg>,
]

function CurlEffect({ corner }: { corner: "bottom-right" | "bottom-left" }) {
  const isRight = corner === "bottom-right"

  return (
    <div
      className="absolute pointer-events-none z-10"
      aria-hidden="true"
      style={{
        bottom: 0,
        [isRight ? "right" : "left"]: 0,
        width: 38,
        height: 38,
      }}
    >
      {/* Peeled-back triangle revealing "underside" */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          [isRight ? "right" : "left"]: 0,
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: isRight ? "0 0 38px 38px" : "0 38px 38px 0",
          borderColor: isRight
            ? "transparent transparent #F0EDE8 transparent"
            : "transparent transparent #F0EDE8 transparent",
          // Note: the eggshell triangle is the "reveal" of the page beneath
        }}
      />
      {/* Darker underside of the curl showing paper fold */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          [isRight ? "right" : "left"]: 0,
          width: 38,
          height: 38,
          background: isRight
            ? "linear-gradient(315deg, transparent 48%, #a52020 48%, #7a1616 52%, #6e1313 100%)"
            : "linear-gradient(225deg, transparent 48%, #a52020 48%, #7a1616 52%, #6e1313 100%)",
        }}
      />
      {/* Shadow under the curl */}
      <div
        style={{
          position: "absolute",
          bottom: 2,
          [isRight ? "right" : "left"]: 2,
          width: 30,
          height: 30,
          background: isRight
            ? "radial-gradient(ellipse at bottom right, rgba(0,0,0,0.25) 0%, transparent 70%)"
            : "radial-gradient(ellipse at bottom left, rgba(0,0,0,0.25) 0%, transparent 70%)",
          filter: "blur(3px)",
        }}
      />
    </div>
  )
}

export function ToolsIndex() {
  return (
    <nav className="px-6 md:px-12 py-12 md:py-20" style={{ perspective: "800px" }}>
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-10 lg:gap-14">
        {notes.map((note, i) => (
          <Link
            key={note.name}
            href={note.href}
            className="group relative block w-full max-w-[240px] md:max-w-[220px] lg:max-w-[240px]"
            style={{
              transform: `rotate(${note.rotate}) translateY(${note.translateY})`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Realistic drop shadow - offset, soft, slightly rotated with note */}
            <div
              className="absolute -inset-1 transition-all duration-300 group-hover:translate-y-1"
              style={{
                background: "radial-gradient(ellipse at 55% 60%, rgba(0,0,0,0.18) 0%, transparent 70%)",
                filter: "blur(10px)",
                transform: "translateY(6px) translateX(3px)",
              }}
              aria-hidden="true"
            />

            {/* Note body with subtle texture gradient for depth */}
            <div
              className="sticky-note relative overflow-hidden flex flex-col items-start gap-3 px-6 py-8 md:px-7 md:py-10 transition-all duration-300 group-hover:-translate-y-1"
              style={{
                background: `
                  linear-gradient(
                    168deg,
                    #8B1A1A 0%,
                    #8B1A1A 20%,
                    #821818 45%,
                    #7e1717 70%,
                    #8B1A1A 100%
                  )
                `,
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.08),
                  inset 0 -1px 0 rgba(0,0,0,0.12),
                  0 1px 3px rgba(0,0,0,0.1)
                `,
              }}
            >
              {/* Wrinkle texture overlay */}
              {wrinklePatterns[note.wrinkleVariant]}

              {/* Very faint noise texture via repeating gradient */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-30"
                aria-hidden="true"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      ${45 + i * 30}deg,
                      transparent,
                      transparent 3px,
                      rgba(255,255,255,0.02) 3px,
                      rgba(255,255,255,0.02) 4px
                    )
                  `,
                }}
              />

              <h2 className="relative z-10 font-sans text-lg md:text-xl font-bold tracking-[0.14em] text-primary-foreground uppercase leading-tight">
                {note.name}
              </h2>
              <p className="relative z-10 font-mono text-xs md:text-sm text-primary-foreground/75 italic leading-relaxed">
                {note.description}
              </p>
            </div>

            {/* 3D page curl */}
            <CurlEffect corner={note.curlCorner} />
          </Link>
        ))}
      </div>
    </nav>
  )
}
