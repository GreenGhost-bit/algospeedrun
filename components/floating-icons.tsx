"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface FloatingIcon {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  delay: number
  duration: number
}

export function FloatingIcons() {
  const [icons, setIcons] = useState<FloatingIcon[]>([])

  useEffect(() => {
    const generated: FloatingIcon[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 30,
      rotation: Math.random() * 360,
      delay: Math.random() * 4,
      duration: 5 + Math.random() * 6,
    }))
    setIcons(generated)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
          }}
          animate={{
            y: [0, -30, -15, -35, 0],
            rotate: [icon.rotation, icon.rotation + 15, icon.rotation - 10, icon.rotation + 5, icon.rotation],
          }}
          transition={{
            duration: icon.duration,
            delay: icon.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width={icon.size}
            height={icon.size}
            viewBox="0 0 40 40"
            fill="none"
            className="opacity-20"
          >
            <path
              d="M20 2L8 10V26L20 34V18L32 10V26L20 34"
              stroke="hsl(225, 100%, 50%)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="20"
              cy="10"
              r="3"
              fill="hsl(174, 80%, 45%)"
              opacity="0.5"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
