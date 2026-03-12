"use client"

import { NetworkId, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import { ReactNode } from 'react'

const walletManager = new WalletManager({
    wallets: [
        WalletId.PERA,
        WalletId.DEFLY,
        WalletId.LUTE,
        WalletId.KIBISIS
    ],
    network: NetworkId.TESTNET
})

export function AppWalletProvider({ children }: { children: ReactNode }) {
    return (
        <WalletProvider manager={walletManager}>
            {children}
        </WalletProvider>
    )
}
