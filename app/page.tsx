"use client"

import { useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { Header } from "@/components/header"
import { FloatingIcons } from "@/components/floating-icons"
import { MouseParticles } from "@/components/mouse-particles"
import { LevelMap } from "@/components/level-map"
import { CommunityFooter } from "@/components/community-footer"
import { useToast } from "@/hooks/use-toast"
import { useWallet } from "@txnlab/use-wallet-react"
import { ConnectWalletModal } from "@/components/connect-wallet-modal"

import { useRouter } from "next/navigation"

export default function Page() {
  const { activeAccount, wallets } = useWallet()
  const isConnected = !!activeAccount
  const { toast } = useToast()
  const router = useRouter()
  const [maxUnlocked, setMaxUnlocked] = useState(1)
  const [walletModalOpen, setWalletModalOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('algospeedrun_progress')
    if (saved) setMaxUnlocked(Math.max(1, parseInt(saved, 10)))
  }, [])

  const handleConnectWallet = useCallback(() => {
    if (!isConnected) {
      setWalletModalOpen(true)
    } else {
      wallets.forEach((w) => {
        if (w.isConnected) w.disconnect()
      })
    }
  }, [isConnected, wallets])

  const handleLevelClick = useCallback(
    (level: number) => {
      if (!isConnected) {
        toast({
          variant: "destructive",
          title: "Please connect your wallet first",
          description: "You need to connect a demo wallet before selecting a level.",
        })
        return
      }
      if (level > maxUnlocked) {
        toast({
          title: "Level Locked",
          description: `Complete Level ${level - 1} to unlock this level.`,
        })
        return
      }
      // Navigate to level
      router.push(`/level/${level}`)
    },
    [isConnected, toast, router, maxUnlocked]
  )

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(262 80% 60% / 0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, hsl(174 80% 45% / 0.03) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <FloatingIcons />
      <MouseParticles />
      <Header onConnectWallet={handleConnectWallet} isConnected={isConnected} />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-36 pt-24">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex flex-col items-center gap-3 text-center"
        >
          <h1 className="font-mono text-4xl font-bold italic tracking-tight text-algo-purple sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-balance">AlgoSpeed Arena</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md font-mono text-base text-muted-foreground sm:text-lg"
          >
            Type fast. Avoid errors. Prove your worth in the Borderless Economy.
            <br />
            <span className="text-foreground">Choose your level!</span>
          </motion.p>
        </motion.div>

        {/* Level map */}
        <LevelMap onLevelClick={handleLevelClick} maxUnlocked={maxUnlocked} isConnected={isConnected} />
      </main>

      <ConnectWalletModal open={walletModalOpen} onOpenChange={setWalletModalOpen} />

      <CommunityFooter />
    </div>
  )
}
