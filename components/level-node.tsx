"use client"

import { motion } from "framer-motion"
import { Lock } from "lucide-react"

interface LevelNodeProps {
  level: number
  isLocked: boolean
  isActive: boolean
  onClick: () => void
}

export function LevelNode({ level, isLocked, isActive, onClick }: LevelNodeProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={!isLocked ? { scale: 1.1 } : undefined}
      whileTap={!isLocked ? { scale: 0.95 } : undefined}
      className={`group relative flex items-center justify-center ${
        isLocked ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      aria-label={isLocked ? `Level ${level} - Locked` : `Level ${level}`}
    >
      <div className="relative">
        {/* Outer glow ring */}
        {isActive && (
          <motion.div
            className="absolute -inset-3 rounded-2xl bg-algo-purple/20"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Hexagonal shape via rotated square */}
        <motion.div
          className={`relative flex h-24 w-24 items-center justify-center rounded-2xl ${
            isLocked
              ? "bg-muted text-muted-foreground opacity-40 blur-[1px]"
              : isActive
                ? "bg-gradient-to-br from-algo-purple to-algo-blue text-primary-foreground shadow-xl animate-glow-pulse"
                : "bg-gradient-to-br from-algo-purple/80 to-algo-blue/80 text-primary-foreground shadow-lg"
          }`}
          style={{ transform: "rotate(45deg)" }}
          animate={
            isActive
              ? { y: [0, -8, 0] }
              : {}
          }
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div style={{ transform: "rotate(-45deg)" }} className="flex flex-col items-center gap-0.5">
            {isLocked ? (
              <Lock className="h-6 w-6" />
            ) : (
              <span className="font-mono text-3xl font-bold">{level}</span>
            )}
          </div>
        </motion.div>

        {/* Small decorative dot */}
        {!isLocked && (
          <motion.div
            className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-algo-teal"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
    </motion.button>
  )
}
