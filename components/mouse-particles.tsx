"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
}

let particleId = 0

export function MouseParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (Math.random() > 0.85) {
      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
      }
      setParticles((prev) => [...prev.slice(-12), newParticle])
    }
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const handleComplete = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute h-2 w-2 rounded-full bg-algo-purple"
            style={{ left: particle.x, top: particle.y }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{
              opacity: 0,
              scale: 0,
              y: -30 + Math.random() * -20,
              x: (Math.random() - 0.5) * 40,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onAnimationComplete={() => handleComplete(particle.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
