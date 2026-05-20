// zustand

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface WalletStore {
  mnemonic: string,
  setMnemonic: (m: string) => void,
  wallets: Wallet[],
  setWallets: (w: Wallet[]) => void
}

export interface Wallet {
  publicKey: string
  privateKey: string
  path: string
}


export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      mnemonic: "",
      setMnemonic: (m: string) => set({ mnemonic: m }),

      wallets: [],
      setWallets: (w: Wallet[]) => set({ wallets: w }),
    }),

    {
      name: "wallet-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
