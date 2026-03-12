"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useWallet } from '@txnlab/use-wallet-react'
import { Button } from "@/components/ui/button"

export function ConnectWalletModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const { wallets } = useWallet()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xs bg-card/95 backdrop-blur-xl border-border/50">
                <DialogHeader>
                    <DialogTitle className="text-xl font-mono text-center">Connect Wallet</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3 mt-4">
                    {wallets.map((wallet) => (
                        <Button
                            key={wallet.id}
                            variant="outline"
                            className="w-full justify-start h-12 bg-background font-mono border-border/50 hover:border-algo-teal/50"
                            onClick={() => {
                                wallet.connect()
                                onOpenChange(false)
                            }}
                            disabled={wallet.isConnected}
                        >
                            <img src={wallet.metadata.icon} alt={wallet.metadata.name} className="w-6 h-6 mr-3 rounded-md" />
                            {wallet.metadata.name}
                            {wallet.isConnected && " (Connected)"}
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
