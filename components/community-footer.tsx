"use client"

import { motion } from "framer-motion"
import { MessageCircle, Globe, BookOpen, Send } from "lucide-react"

const links = [
  { label: "Telegram", icon: Send, href: "https://t.me/algorand" },
  { label: "Discord", icon: MessageCircle, href: "https://discord.com/invite/algorand" },
  { label: "X (Twitter)", icon: Globe, href: "https://x.com/AlgoFoundation?lang=en" },
  { label: "Dev Portal", icon: BookOpen, href: "https://developer.algorand.org/" },
]

const tickerText = "Built for the Algorand Community  \u00B7  Join the Speedrun  \u00B7  Master the Borderless Economy  \u00B7  "

export function CommunityFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30">
      {/* Community bar */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="border-t border-border/30 bg-gradient-to-r from-algo-purple/10 via-algo-blue/10 to-algo-teal/10 backdrop-blur-lg"
      >
        <div className="flex flex-col items-center gap-3 px-4 py-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
            Join the Community
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Community links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/80 px-4 py-1.5 font-mono text-xs font-medium text-foreground transition-all hover:border-algo-purple/50 hover:bg-algo-purple/10 hover:text-algo-purple"
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Scrolling ticker */}
        <div className="overflow-hidden border-t border-border/20 bg-foreground/5 py-1.5">
          <div className="animate-ticker-scroll flex whitespace-nowrap">
            <span className="font-mono text-xs text-muted-foreground">
              {tickerText}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {tickerText}
            </span>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
