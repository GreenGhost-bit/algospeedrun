"use client"

import { useState, use } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { FloatingIcons } from "@/components/floating-icons"
import { TypingTest } from "@/components/typing-test"
import { LevelCompleteModal } from "@/components/level-complete-modal"
import { levels } from "@/data/levels"
import { notFound, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MouseParticles } from "@/components/mouse-particles"
import { ArrowLeft } from "lucide-react"
import { useWallet } from "@txnlab/use-wallet-react"
import { ConnectWalletModal } from "@/components/connect-wallet-modal"

export default function LevelPage({ params }: { params: Promise<{ id: string }> }) {
    // Extract id from promise
    const { id } = use(params)
    const levelId = parseInt(id, 10)
    const levelData = levels.find((l) => l.id === levelId)
    const router = useRouter()

    const { activeAccount, wallets } = useWallet()
    const isConnected = !!activeAccount

    const [modalOpen, setModalOpen] = useState(false)
    const [connectModalOpen, setConnectModalOpen] = useState(false)
    const [results, setResults] = useState({ wpm: 0, accuracy: 0 })
    const [key, setKey] = useState(0) // Used to force re-render TypingTest on replay

    if (!levelData) {
        notFound()
    }

    const handleConnectWallet = () => {
        if (!isConnected) {
            setConnectModalOpen(true)
        } else {
            wallets.forEach(w => w.isConnected && w.disconnect())
        }
    }

    const handleComplete = (wpm: number, accuracy: number) => {
        setResults({ wpm, accuracy })
        setModalOpen(true)

        if (wpm >= levelData.targetWpm) {
            const saved = localStorage.getItem('algospeedrun_progress')
            const currentProgress = saved ? parseInt(saved, 10) : 1
            if (levelId === currentProgress) {
                localStorage.setItem('algospeedrun_progress', (levelId + 1).toString())
            }
        }
    }

    const handleReplay = () => {
        setModalOpen(false)
        setKey(prev => prev + 1)
    }

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div
                className="pointer-events-none fixed inset-0 z-0"
                style={{
                    background: "radial-gradient(ellipse at 50% 0%, hsl(174 80% 45% / 0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, hsl(262 80% 60% / 0.03) 0%, transparent 50%)",
                }}
                aria-hidden="true"
            />

            <FloatingIcons />
            <MouseParticles />
            <Header onConnectWallet={handleConnectWallet} isConnected={isConnected} />

            <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-12">

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-4xl flex justify-start mb-4"
                >
                    <Button variant="ghost" onClick={() => router.push('/')} className="text-muted-foreground hover:text-foreground hover:bg-muted font-mono">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Arena
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-4xl mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4"
                >
                    <div>
                        <h1 className="font-mono text-3xl font-bold tracking-tight text-algo-purple sm:text-5xl">
                            Level {levelData.id}: <span className="text-foreground">{levelData.title}</span>
                        </h1>
                        <p className="mt-2 text-muted-foreground font-mono text-sm sm:text-base">
                            {levelData.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-card/60 px-4 py-2 border border-border/50 rounded-lg backdrop-blur-sm">
                        <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Target:</span>
                        <span className="text-lg font-mono font-bold text-algo-teal">{levelData.targetWpm} WPM</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                >
                    <TypingTest
                        key={key}
                        textToType={levelData.textToType}
                        targetWpm={levelData.targetWpm}
                        onComplete={handleComplete}
                    />
                </motion.div>
            </main>

            <LevelCompleteModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                wpm={results.wpm}
                accuracy={results.accuracy}
                targetWpm={levelData.targetWpm}
                levelId={levelId}
                isFinalLevel={levelId === levels.length}
                onReplay={handleReplay}
            />

            <ConnectWalletModal open={connectModalOpen} onOpenChange={setConnectModalOpen} />
        </div>
    )
}
