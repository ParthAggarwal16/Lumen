// initialising wallet generator 

import MnemonicGenerator from "../components/MnemonicGenerator.tsx"
import { Keypair } from "@solana/web3.js"
import { derivePath } from "ed25519-hd-key"
import { useWalletStore } from "./store/walletStore.ts"
import { mnemonicToSeedSync } from "bip39"
import { useState } from "react"

interface wallet {
  publicKey: string
  privateKey: string
  path: string
}

const walletGenerator = () => {
  const mnemonic = useWalletStore((state) => state.mnemonic)
  const [pathTypes, setPathTypes] = useState<string[]>([]);
  const [wallets, setWallets] = useState<wallet[]>([]);
  const clearAllWallets = () => {

  }
  const generateWallets = () => {
    const seed = mnemonicToSeedSync(mnemonic)
    const hexSeed = seed.toString('hex')
    for (let i = 0; i < 4; i++) {
      const path = `m/44'/501'/${i}/0'`;
      const derivedSeed = derivePath(path, hexSeed).key;
      const secret = Keypair.fromSecretKey(derivedSeed)

    }
    //logic to be added
  }
  const deleteWallets = () => {
    //logic to be added
  }
  return ()
}
