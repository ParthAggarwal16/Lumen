// zustand

import { create } from "zustand";

interface WalletStore {
  mnemonic: string;
  setMnemonic: (m: string) => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  mnemonic: "",
  setMnemonic: (m: string) => set({ mnemonic: m })
}))
