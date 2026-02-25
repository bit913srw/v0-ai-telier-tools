"use client"

import Link from "next/link"
import { useRef, useEffect, useState, useCallback } from "react"

function FitText({ children }: { children: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const [fontSize, setFontSize] = useState(48)

  const fit = useCallback(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    const maxW = container.clientWidth - 32 // px-4 on each side
    const maxH = container.clientHeight - 32

    let lo = 12
    let hi = 120
    let best = lo

    // Binary search for the largest font size that fits
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
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center px-4 py-4 z-10">
      <h2
        ref={textRef}
        className="font-bold text-primary-foreground leading-[1.1] text-center text-balance"
        style={{ fontSize: `${fontSize}px`, fontFamily: 'var(--font-handwriting)' }}
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
    tapeRotate: 4,
    tapeOffsetX: -6,
    wrinkleVariant: 0,
  },
  {
    name: "Measurements",
    href: "/tools/measurements",
    rotate: 2,
    translateY: -6,
    tapeRotate: -2.5,
    tapeOffsetX: 4,
    wrinkleVariant: 1,
  },
  {
    name: "Working Ideas",
    href: "/tools/ideas",
    rotate: -1.2,
    translateY: 20,
    tapeRotate: 1.5,
    tapeOffsetX: -2,
    wrinkleVariant: 2,
  },
]

/* SVG masking tape — torn ragged edges, semi-translucent, like the reference */
function MaskingTape({ rotate, offsetX }: { rotate: number; offsetX: number }) {
  return (
    <div
      className="absolute z-20 pointer-events-none"
      style={{
        top: -14,
        left: "50%",
        transform: `translateX(calc(-50% + ${offsetX}px)) rotate(${rotate}deg)`,
        width: 90,
        height: 32,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 90 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Tape body with torn edges */}
        <path
          d="M2,4 Q5,2 10,5 L12,3 Q16,6 20,4 L24,5 Q28,2 32,4 L36,3 Q40,5 44,4 L48,5 Q52,3 56,5 L60,4 Q64,6 68,4 L72,5 Q76,3 80,5 L84,4 Q87,3 88,5
             L89,8 Q88,10 89,14 L88,18 Q89,22 88,25 L89,27 Q87,30 84,28 L80,29 Q76,31 72,28 L68,30 Q64,28 60,29 L56,28 Q52,30 48,28 L44,29 Q40,27 36,29 L32,28 Q28,30 24,28 L20,29 Q16,27 12,29 L10,28 Q5,30 2,28
             L1,25 Q2,22 1,18 L2,14 Q1,10 2,8 Z"
          fill="rgba(235,230,222,0.82)"
        />
        {/* Subtle tape texture lines */}
        <line x1="8" y1="10" x2="82" y2="11" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />
        <line x1="6" y1="16" x2="84" y2="15" stroke="rgba(0,0,0,0.025)" strokeWidth="0.5" />
        <line x1="10" y1="22" x2="80" y2="21" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />
        {/* Highlights to simulate light hitting creases */}
        <path d="M15,6 Q30,9 50,7 T80,8" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
        <path d="M10,24 Q35,22 55,25 T85,23" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
        {/* Shadow edges */}
        <path
          d="M2,4 Q5,2 10,5 L12,3 Q16,6 20,4 L24,5 Q28,2 32,4 L36,3 Q40,5 44,4 L48,5 Q52,3 56,5 L60,4 Q64,6 68,4 L72,5 Q76,3 80,5 L84,4 Q87,3 88,5"
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="0.6"
        />
        <path
          d="M89,27 Q87,30 84,28 L80,29 Q76,31 72,28 L68,30 Q64,28 60,29 L56,28 Q52,30 48,28 L44,29 Q40,27 36,29 L32,28 Q28,30 24,28 L20,29 Q16,27 12,29 L10,28 Q5,30 2,28"
          fill="none"
          stroke="rgba(0,0,0,0.05)"
          strokeWidth="0.5"
        />
      </svg>
      {/* Tape shadow on the note surface below */}
      <div
        className="absolute left-2 right-2 -bottom-1 h-2"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.06), transparent)",
          filter: "blur(1px)",
        }}
      />
    </div>
  )
}

/* SVG wrinkle patterns — unique crease lines per note */
const wrinklePatterns = [
  <svg key="w0" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 240 280">
    <path d="M20,60 Q80,52 180,72" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="0.8" />
    <path d="M0,130 Q100,120 240,140" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="0.7" />
    <path d="M30,200 Q120,190 200,205" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.6" />
    <path d="M15,25 Q100,35 220,20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.2" />
    <path d="M60,160 Q140,155 220,168" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
    <path d="M0,240 Q80,232 180,245" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />
  </svg>,
  <svg key="w1" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 240 280">
    <path d="M10,80 Q90,70 230,88" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.7" />
    <path d="M0,170 Q60,162 180,175 T240,170" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.6" />
    <path d="M5,40 Q80,32 200,45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
    <path d="M30,120 Q150,112 230,126" fill="none" stroke="rgba(0,0,0,0.035)" strokeWidth="0.8" />
    <path d="M0,220 Q100,215 200,228" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.7" />
    <path d="M50,260 Q130,252 210,264" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />
  </svg>,
  <svg key="w2" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 240 280">
    <path d="M20,55 Q110,45 220,62" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.7" />
    <path d="M0,145 Q120,135 240,152" fill="none" stroke="rgba(0,0,0,0.045)" strokeWidth="0.6" />
    <line x1="135" y1="10" x2="118" y2="270" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
    <path d="M10,100 Q80,92 170,105" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
    <path d="M40,210 Q130,200 220,215" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.7" />
    <path d="M0,250 Q60,244 160,255" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />
  </svg>,
]

/* Corner curl with 3D fold effect */
function CurlEffect() {
  return (
    <div
      className="absolute bottom-0 right-0 pointer-events-none z-10"
      aria-hidden="true"
      style={{ width: 34, height: 34 }}
    >
      {/* Background reveal (eggshell showing through) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "0 0 34px 34px",
          borderColor: "transparent transparent #F0EDE8 transparent",
        }}
      />
      {/* Paper underside gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 34,
          height: 34,
          background: "linear-gradient(315deg, transparent 47%, #a52222 47%, #922020 50%, #7a1818 54%, #6e1515 100%)",
        }}
      />
      {/* Curl shadow */}
      <div
        style={{
          position: "absolute",
          bottom: 1,
          right: 1,
          width: 26,
          height: 26,
          background: "radial-gradient(ellipse at bottom right, rgba(0,0,0,0.3) 0%, transparent 65%)",
          filter: "blur(3px)",
        }}
      />
    </div>
  )
}

export function ToolsIndex() {
  return (
    <nav className="px-6 md:px-12 py-8 md:py-12 w-full" style={{ perspective: "900px" }}>
      <div className="flex flex-col items-center gap-14 md:flex-row md:justify-center md:items-start md:gap-10 lg:gap-14">
        {notes.map((note, i) => (
          <Link
            key={note.name}
            href={note.href}
            className="group relative block w-[200px] md:w-[200px] lg:w-[220px]"
            style={{
              transform: `rotate(${note.rotate}deg) translateY(${note.translateY}px)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Masking tape */}
            <MaskingTape rotate={note.tapeRotate} offsetX={note.tapeOffsetX} />

            {/* Drop shadow — soft, offset, realistic */}
            <div
              className="absolute -inset-2 transition-all duration-300 group-hover:translate-y-1"
              style={{
                background: "radial-gradient(ellipse at 55% 65%, rgba(0,0,0,0.22) 0%, transparent 65%)",
                filter: "blur(12px)",
                transform: "translateY(8px) translateX(4px)",
              }}
              aria-hidden="true"
            />

            {/* Note body */}
            <div
              className="sticky-note relative overflow-hidden flex items-center justify-center aspect-square transition-all duration-300 group-hover:-translate-y-1"
              style={{
                background: `
                  linear-gradient(
                    ${155 + i * 20}deg,
                    #8e1c1c 0%,
                    #8B1A1A 25%,
                    #841919 50%,
                    #7f1717 75%,
                    #8B1A1A 100%
                  )
                `,
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.07),
                  inset 0 -1px 0 rgba(0,0,0,0.15),
                  0 2px 6px rgba(0,0,0,0.12)
                `,
              }}
            >
              {/* Wrinkle overlay */}
              {wrinklePatterns[note.wrinkleVariant]}

              {/* Paper fiber noise texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                aria-hidden="true"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      ${40 + i * 35}deg,
                      transparent 0px,
                      transparent 2px,
                      rgba(255,255,255,0.015) 2px,
                      rgba(255,255,255,0.015) 3px
                    ),
                    repeating-linear-gradient(
                      ${110 + i * 25}deg,
                      transparent 0px,
                      transparent 4px,
                      rgba(0,0,0,0.012) 4px,
                      rgba(0,0,0,0.012) 5px
                    )
                  `,
                }}
              />

              {/* Auto-fit title */}
              <FitText>{note.name}</FitText>
            </div>

            {/* Corner curl */}
            <CurlEffect />
          </Link>
        ))}
      </div>
    </nav>
  )
}
