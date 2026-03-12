"use client"

import { motion } from "framer-motion"
import { LevelNode } from "@/components/level-node"

interface LevelMapProps {
  onLevelClick: (level: number) => void
  isConnected: boolean
  maxUnlocked?: number
}

const levelsData = [
  { level: 1, label: "The Borderless Economy", description: "Learn the core principles of Algorand." },
  { level: 2, label: "PyTeal Basics", description: "Write your first smart contract in PyTeal." },
  { level: 3, label: "Silvio's Vision", description: "Complete the ultimate challenge to earn your praise." },
]

export function LevelMap({ onLevelClick, isConnected, maxUnlocked = 1 }: LevelMapProps) {
  const levels = levelsData.map(l => ({ ...l, isLocked: l.level > maxUnlocked }))

  return (
    <section className="relative flex flex-col items-center gap-8 px-4 py-8">
      {/* Active level - Level 1 featured large */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col items-center gap-6"
      >
        <LevelNode
          level={1}
          isLocked={false}
          isActive={true}
          onClick={() => onLevelClick(1)}
        />

        {/* Glass card below level 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ y: -4, scale: 1.02 }}
          onClick={() => onLevelClick(1)}
          className="cursor-pointer rounded-2xl border border-border/50 bg-card/60 px-8 py-5 shadow-lg backdrop-blur-md transition-shadow hover:shadow-xl"
          role="button"
          tabIndex={0}
          aria-label="Register for Level 1"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              onLevelClick(1)
            }
          }}
        >
          <p className="font-mono text-lg font-semibold text-foreground">
            {levels[0].label}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {levels[0].description}
          </p>
        </motion.div>
      </motion.div>

      {/* Locked levels row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
      >
        {levels.slice(1).map((lvl, idx) => (
          <motion.div
            key={lvl.level}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 + idx * 0.15 }}
            className="flex flex-col items-center gap-3"
          >
            <LevelNode
              level={lvl.level}
              isLocked={lvl.isLocked}
              isActive={false}
              onClick={() => onLevelClick(lvl.level)}
            />
            <span className="font-mono text-xs text-muted-foreground/60">
              {lvl.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
