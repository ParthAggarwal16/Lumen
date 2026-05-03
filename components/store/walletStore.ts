// zustand

import { create } from "zustand";

// store/walletStore.ts
const useWalletStore = create((set) => ({
  mnemonic: '',
  setMnemonic: (m: string) => set({ mnemonic: m })
}))
