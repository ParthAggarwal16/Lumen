// zustand

import { create } from "zustand";

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


export const useWalletStore = create<WalletStore>((set) => ({
  mnemonic: "",
  setMnemonic: (m: string) => set({ mnemonic: m }),
  wallets: [],
  setWallets: (w: Wallet[]) => set({ wallets: w })
}))
