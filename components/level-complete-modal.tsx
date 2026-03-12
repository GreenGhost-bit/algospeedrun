"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { CheckCircle2, Trophy, Clock, Target, ArrowRight, RotateCcw } from "lucide-react"
import { useRouter } from "next/navigation"

interface LevelCompleteModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    wpm: number
    accuracy: number
    targetWpm: number
    levelId: number
    isFinalLevel?: boolean
    onReplay: () => void
}

export function LevelCompleteModal({
    open,
    onOpenChange,
    wpm,
    accuracy,
    targetWpm,
    levelId,
    isFinalLevel,
    onReplay
}: LevelCompleteModalProps) {
    const router = useRouter()
    const isSuccess = wpm >= targetWpm

    const handleNext = () => {
        if (isFinalLevel) {
            router.push('/victory')
        } else {
            router.push(`/level/${levelId + 1}`)
        }
    }

    const handleHome = () => {
        router.push('/')
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-border/50 shadow-[0_0_40px_-15px_rgba(20,250,200,0.3)]">
                <DialogHeader className="text-center sm:text-center flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isSuccess ? 'bg-algo-teal/20 text-algo-teal' : 'bg-destructive/20 text-destructive'
                            }`}
                    >
                        {isSuccess ? <CheckCircle2 className="w-8 h-8" /> : <Trophy className="w-8 h-8 opacity-50" />}
                    </motion.div>
                    <DialogTitle className="text-2xl font-mono">
                        {isSuccess ? "Level Cleared!" : "Keep Practicing"}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground font-mono">
                        {isSuccess
                            ? "Excellent typing speed on the Algorand protocol!"
                            : `You need ${targetWpm} WPM to pass. Try again!`}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-around py-6 my-4 bg-background/50 rounded-lg border border-border/30">
                    <div className="flex flex-col items-center gap-1">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <span className="text-3xl font-bold text-foreground font-mono">{wpm}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">WPM</span>
                    </div>
                    <div className="w-[1px] bg-border/50"></div>
                    <div className="flex flex-col items-center gap-1">
                        <Target className="w-5 h-5 text-muted-foreground" />
                        <span className="text-3xl font-bold text-foreground font-mono">{accuracy}%</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Accuracy</span>
                    </div>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-2">
                    <Button variant="outline" className="flex-1 border-border/50 hover:bg-muted font-mono" onClick={onReplay}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Replay
                    </Button>
                    <Button
                        className="flex-1 bg-algo-teal text-teal-950 hover:bg-algo-teal/90 font-mono font-semibold"
                        onClick={isSuccess ? handleNext : onReplay}
                    >
                        {isSuccess ? (
                            <>
                                {isFinalLevel ? "Claim Praise" : "Next Level"}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                        ) : (
                            <>
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Try Again
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
