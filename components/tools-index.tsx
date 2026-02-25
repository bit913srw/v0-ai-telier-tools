"use client"

import Link from "next/link"
import { useRef, useEffect, useState, useCallback } from "react"

/* SVG filter for pencil-like text with inconsistent thickness */
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

/* Ragged torn-edge masking tape SVG — positioned upper-left like the reference photo */
function MaskingTape({ rotate, offsetX }: { rotate: number; offsetX: number }) {
  return (
    <div
      className="absolute z-20 pointer-events-none"
      style={{
        top: -14,
        left: offsetX,
        width: 90,
        height: 32,
        transform: `rotate(${rotate}deg)`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 90 32" fill="none" className="w-full h-full" preserveAspectRatio="none">
        {/* Tape body with torn/ragged edges */}
        <path
          d="M2,6 C4,4 8,5.5 12,5 C16,4.5 20,3.5 26,4 C32,4.5 38,3 44,3.5 C50,4 56,3 62,3.5 C68,4 74,3.2 80,4 C84,4.5 87,5 88,6
             L89,25 C87,26.5 83,25 79,26 C73,27 67,25.5 61,26.5 C55,27.5 49,26 43,27 C37,28 31,26.5 25,27.5 C19,28.5 13,27 7,28 C4,28.5 2,27.5 1,27 Z"
          fill="rgba(230,225,215,0.82)"
        />
        {/* Slightly darker crease across the tape */}
        <path
          d="M6,14 Q25,12 45,15 Q65,18 85,13"
          stroke="rgba(200,195,185,0.4)"
          strokeWidth="0.8"
          fill="none"
        />
        {/* Subtle fold/wrinkle highlight */}
        <path
          d="M10,10 Q30,8 50,11 Q70,14 82,9"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.6"
          fill="none"
        />
        {/* Second subtle crease */}
        <path
          d="M4,20 Q22,18 44,21 Q66,24 86,19"
          stroke="rgba(190,185,175,0.25)"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    </div>
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
    tapeRotate: -12,
    tapeOffsetX: 10,
  },
  {
    name: "Measurements",
    href: "/tools/measurements",
    rotate: 2,
    translateY: -6,
    tapeRotate: -8,
    tapeOffsetX: 16,
  },
  {
    name: "Working Ideas",
    href: "/tools/ideas",
    rotate: -1.2,
    translateY: 20,
    tapeRotate: -15,
    tapeOffsetX: 6,
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
            }}
          >
            {/* Masking tape across upper-left, matching reference photo */}
            <MaskingTape rotate={note.tapeRotate} offsetX={note.tapeOffsetX} />

            {/* Sticky note paper */}
            <div
              className="relative aspect-square overflow-hidden transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02]"
              style={{
                background: `linear-gradient(
                  170deg,
                  #e8e2a8 0%,
                  #e4de9e 15%,
                  #dfd992 40%,
                  #e2dc98 60%,
                  #e6e0a2 85%,
                  #e3dd9a 100%
                )`,
                boxShadow: `
                  2px 4px 12px rgba(0,0,0,0.15),
                  1px 2px 4px rgba(0,0,0,0.1)
                `,
              }}
            >
              {/* Subtle paper texture lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 200 200">
                <line x1="0" y1="30" x2="200" y2="32" stroke="#000" strokeWidth="0.3" />
                <line x1="0" y1="60" x2="200" y2="61" stroke="#000" strokeWidth="0.3" />
                <line x1="0" y1="90" x2="200" y2="89" stroke="#000" strokeWidth="0.3" />
                <line x1="0" y1="120" x2="200" y2="121" stroke="#000" strokeWidth="0.3" />
                <line x1="0" y1="150" x2="200" y2="149" stroke="#000" strokeWidth="0.3" />
                <line x1="0" y1="180" x2="200" y2="181" stroke="#000" strokeWidth="0.3" />
              </svg>

              {/* Inset paper edge shadows */}
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                  boxShadow: `
                    inset 1px 1px 3px rgba(0,0,0,0.08),
                    inset -1px -1px 3px rgba(0,0,0,0.06),
                    inset 0 -3px 8px rgba(0,0,0,0.08)
                  `,
                }}
              />

              {/* Bottom-right corner curl */}
              <div
                className="absolute bottom-0 right-0 w-[28px] h-[28px] pointer-events-none z-10"
                aria-hidden="true"
                style={{
                  background: `linear-gradient(
                    315deg,
                    #F0EDE8 0%,
                    #F0EDE8 44%,
                    #d6d08c 44%,
                    #c8c280 52%,
                    #bfba78 100%
                  )`,
                  boxShadow: "-2px -2px 4px rgba(0,0,0,0.1)",
                }}
              />

              {/* Pencil text */}
              <FitText>{note.name}</FitText>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  )
}
