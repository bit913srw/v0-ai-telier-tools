"use client"

import Link from "next/link"
import { useState } from "react"

const sections = [
  {
    number: "01",
    name: "INSPIRATION",
    description: "Your editorial image library",
    href: "/tools/inspiration",
  },
  {
    number: "02",
    name: "MEASUREMENTS",
    description: "Log body profiles for AI",
    href: "/tools/measurements",
  },
  {
    number: "03",
    name: "WORKING IDEAS",
    description: "Your design notebook",
    href: "/tools/ideas",
  },
]

export function ToolsIndex() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <nav className="px-6 md:px-12 py-12 md:py-16">
      <ul role="list">
        {sections.map((section, index) => (
          <li key={section.number}>
            <Link
              href={section.href}
              className="group block"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-baseline gap-6 md:gap-10 py-8 md:py-10 transition-opacity duration-300"
                style={{
                  opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.35 : 1,
                }}
              >
                <span className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold text-primary tracking-wide leading-none">
                  {section.number}
                </span>

                <div className="flex flex-col gap-2">
                  <span className="font-sans text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.12em] text-primary uppercase">
                    {section.name}
                  </span>
                  <span className="font-mono text-sm md:text-base text-muted-foreground italic">
                    {section.description}
                  </span>
                </div>
              </div>
            </Link>

            {index < sections.length - 1 && (
              <div className="w-full h-px bg-primary/20" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
