"use client"

import { motion } from "framer-motion"
import { Wallet } from "lucide-react"
import { useWallet } from "@txnlab/use-wallet-react"

interface HeaderProps {
  onConnectWallet: () => void
  isConnected: boolean
}

export function Header({ onConnectWallet, isConnected }: HeaderProps) {
  const { activeAccount } = useWallet()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`
  }
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2"
      >
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-label="Algorand Logo">
          <circle cx="24" cy="24" r="22" fill="hsl(220, 20%, 10%)" />
          <path
            d="M30 36L26 24L32 12H28L22 24L18 36H22L24 30L26 36H30Z"
            fill="hsl(0, 0%, 100%)"
          />
          <circle cx="27" cy="14" r="2.5" fill="hsl(174, 80%, 45%)" />
        </svg>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onConnectWallet}
        className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm font-semibold transition-all ${isConnected
            ? "bg-algo-teal text-foreground shadow-lg shadow-algo-teal/30"
            : "bg-foreground text-background shadow-lg hover:shadow-xl"
          }`}
      >
        <Wallet className="h-4 w-4" />
        {isConnected && activeAccount ? formatAddress(activeAccount.address) : "Connect Wallet"}
      </motion.button>
    </header>
  )
}
