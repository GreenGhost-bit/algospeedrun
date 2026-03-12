"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface TypingTestProps {
    textToType: string
    targetWpm: number
    onComplete: (wpm: number, accuracy: number) => void
}

export function TypingTest({ textToType, targetWpm, onComplete }: TypingTestProps) {
    const [inputValue, setInputValue] = useState("")
    const [status, setStatus] = useState<'idle' | 'playing' | 'finished'>('idle')
    const [startTime, setStartTime] = useState<number | null>(null)

    const inputRef = useRef<HTMLTextAreaElement>(null)

    // Focus on mount and click
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (status === 'finished') return

        const value = e.target.value
        // Prevent typing more than needed
        if (value.length > textToType.length) return

        setInputValue(value)

        if (status === 'idle' && value.length > 0) {
            setStatus('playing')
            setStartTime(Date.now())
        }

        if (value.length === textToType.length) {
            // Finished
            setStatus('finished')
            const endTime = Date.now()
            const timeElapsed = (endTime - (startTime || Date.now())) / 1000 / 60 || 0.01 // in min

            const wpm = Math.round((textToType.length / 5) / timeElapsed)

            let correctChars = 0
            for (let i = 0; i < textToType.length; i++) {
                if (value[i] === textToType[i]) correctChars++
            }
            const accuracy = Math.round((correctChars / textToType.length) * 100)

            onComplete(wpm, accuracy)
        }
    }

    const characters = textToType.split('')

    return (
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
            <div
                className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono leading-relaxed tracking-wide text-left cursor-text bg-card/40 p-6 sm:p-10 rounded-xl border border-border/50 backdrop-blur-md shadow-2xl"
                onClick={() => inputRef.current?.focus()}
            >
                <div className="whitespace-pre-wrap">
                    {characters.map((char, index) => {
                        let colorClass = "text-muted-foreground/50" // untyped

                        if (index < inputValue.length) {
                            colorClass = inputValue[index] === char ? "text-algo-teal drop-shadow-[0_0_8px_rgba(20,250,200,0.5)]" : "text-destructive drop-shadow-[0_0_8px_rgba(255,50,50,0.5)]"
                        }

                        const isCursor = index === inputValue.length

                        return (
                            <span key={index} className="relative inline-block">
                                {isCursor && status !== 'finished' && (
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                        className="absolute left-0 top-[10%] w-[3px] h-[80%] bg-algo-purple"
                                    />
                                )}
                                <span className={`${colorClass} ${char === ' ' && inputValue[index] !== char && index < inputValue.length ? 'bg-destructive/40 border-b-2 border-destructive' : ''}`}>
                                    {char}
                                </span>
                            </span>
                        )
                    })}

                    {inputValue.length === characters.length && status !== 'finished' && (
                        <span className="relative inline-block">
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                className="absolute left-0 top-[10%] w-[3px] h-[80%] bg-algo-purple"
                            />
                        </span>
                    )}
                </div>
            </div>

            <textarea
                ref={inputRef}
                value={inputValue}
                onChange={handleChange}
                onBlur={() => { if (status !== 'finished') inputRef.current?.focus() }} // force focus
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-text resize-none sm:-z-10"
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                disabled={status === 'finished'}
            />

            {status === 'idle' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-algo-purple/80 animate-pulse mt-8 font-mono text-lg flex items-center gap-2"
                >
                    <span>&gt;</span> Start typing to begin...
                </motion.div>
            )}
        </div>
    )
}
