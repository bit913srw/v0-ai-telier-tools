"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useEffect, useState, useCallback } from "react"

/* SVG filter for pencil-like text: feTurbulence displaces edges irregularly,
   simulating the inconsistent pressure of a real pencil on paper. */
function PencilFilter() {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <filter id="pencil" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="4"
            seed="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feMorphology
            in="displaced"
            operator="erode"
            radius="0.2"
            result="thinned"
          />
          <feGaussianBlur in="thinned" stdDeviation="0.3" result="softened" />
          <feComponentTransfer in="softened" result="final">
            <feFuncA type="linear" slope="1.6" intercept="-0.15" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  )
}

function FitText({ children }: { children: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const [fontSize, setFontSize] = useState(48)

  const fit = useCallback(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    const maxW = container.clientWidth - 48
    const maxH = container.clientHeight - 48

    let lo = 12
    let hi = 120
    let best = lo

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2)
      text.style.fontSize = `${mid}px`
      const fits = text.scrollWidth <= maxW && text.scrollHeight <= maxH
      if (fits) {
        best = mid
        lo = mid + 1
      } else {
        hi = mid - 1
      }
    }

    setFontSize(best)
  }, [])

  useEffect(() => {
    fit()
    window.addEventListener("resize", fit)
    return () => window.removeEventListener("resize", fit)
  }, [fit])

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center px-6 py-6 z-10">
      <h2
        ref={textRef}
        className="font-bold leading-[1.1] text-center text-balance"
        style={{
          fontSize: `${fontSize}px`,
          fontFamily: "var(--font-handwriting)",
          color: "#2a2a2a",
          filter: "url(#pencil)",
          WebkitTextStroke: "0.3px rgba(30,30,30,0.3)",
        }}
      >
        {children}
      </h2>
    </div>
  )
}

const notes = [
  {
    name: "Inspiration",
    href: "/tools/inspiration",
    rotate: -3.5,
    translateY: 24,
  },
  {
    name: "Measurements",
    href: "/tools/measurements",
    rotate: 2,
    translateY: -6,
  },
  {
    name: "Working Ideas",
    href: "/tools/ideas",
    rotate: -1.2,
    translateY: 20,
  },
]

export function ToolsIndex() {
  return (
    <nav className="px-6 md:px-12 py-8 md:py-12 w-full">
      <PencilFilter />
      <div className="flex flex-col items-center gap-10 md:flex-row md:justify-center md:items-start md:gap-8 lg:gap-12">
        {notes.map((note) => (
          <Link
            key={note.name}
            href={note.href}
            className="group relative block w-[200px] md:w-[200px] lg:w-[220px]"
            style={{
              transform: `rotate(${note.rotate}deg) translateY(${note.translateY}px)`,
              filter: "drop-shadow(3px 6px 8px rgba(0,0,0,0.18))",
            }}
          >
            {/* Container for positioning */}
            <div className="relative aspect-[0.88] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02]">
              {/* Sticky note image with blend mode to remove black background */}
              <div className="absolute inset-0 overflow-hidden" style={{ mixBlendMode: "lighten" }}>
                <Image
                  src="/images/sticky-note.jpeg"
                  alt=""
                  fill
                  className="object-cover pointer-events-none select-none"
                  sizes="220px"
                  priority
                />
              </div>
              {/* Text overlay sits above the blended image */}
              <FitText>{note.name}</FitText>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  )
}
