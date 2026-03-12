"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Trophy, Home, Heart } from "lucide-react"
import { useWallet } from "@txnlab/use-wallet-react"
import { ConnectWalletModal } from "@/components/connect-wallet-modal"
import { useRouter } from "next/navigation"

export default function VictoryPage() {
    const router = useRouter()
    const [showPraise, setShowPraise] = useState(false)
    const { activeAccount, wallets } = useWallet()
    const isConnected = !!activeAccount
    const [connectModalOpen, setConnectModalOpen] = useState(false)

    const handleConnectWallet = () => {
        if (!isConnected) {
            setConnectModalOpen(true)
        } else {
            wallets.forEach(w => w.isConnected && w.disconnect())
        }
    }

    useEffect(() => {
        // Fire confetti immediately
        const duration = 5 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#14FAC8', '#9B51E0', '#FFFFFF']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#14FAC8', '#9B51E0', '#FFFFFF']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();

        // Show text after delay
        const timer = setTimeout(() => setShowPraise(true), 2500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="relative min-h-screen overflow-hidden flex flex-col justify-center items-center bg-black">
            <div
                className="pointer-events-none fixed inset-0 z-0"
                style={{
                    background: "radial-gradient(circle at 50% 50%, hsl(262 80% 60% / 0.15) 0%, transparent 80%)",
                }}
                aria-hidden="true"
            />

            <Header onConnectWallet={handleConnectWallet} isConnected={isConnected} />

            <main className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-2xl text-center space-y-8">

                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-32 h-32 bg-algo-purple rounded-full flex items-center justify-center shadow-[0_0_100px_40px_rgba(155,81,224,0.4)]"
                >
                    <Trophy className="w-16 h-16 text-white" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="font-mono text-4xl sm:text-6xl font-bold text-white tracking-widest"
                >
                    YOU DID IT.
                </motion.h1>

                <div className="h-48 flex items-center justify-center">
                    {showPraise && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <p className="font-mono text-xl sm:text-2xl text-algo-teal drop-shadow-md">
                                "Truly exceptional typing. You have proven yourself worthy of the borderless economy."
                            </p>
                            <p className="font-mono text-muted-foreground text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                                - The Algorand Foundation <Heart className="w-4 h-4 text-destructive animate-pulse" />
                            </p>
                        </motion.div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4 }}
                >
                    <Button
                        size="lg"
                        className="bg-white text-black hover:bg-gray-200 font-mono text-lg px-8 py-6 rounded-full"
                        onClick={() => router.push('/')}
                    >
                        <Home className="w-5 h-5 mr-3" />
                        Return to Arena
                    </Button>
                </motion.div>

            </main>

            <ConnectWalletModal open={connectModalOpen} onOpenChange={setConnectModalOpen} />
        </div>
    )
}
