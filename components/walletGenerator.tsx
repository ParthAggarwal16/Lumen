// initialising wallet generator 

import MnemonicGenerator from "../components/MnemonicGenerator.tsx"
import { Keypair } from "@solana/web3.js"
import { derivePath } from "ed25519-hd-key"
import { useWalletStore } from "./store/walletStore.ts"
import { mnemonicToSeedSync } from "bip39"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface wallet {
  publicKey: string
  privateKey: string
  path: string
}

const WalletGenerator = () => {
  const mnemonic = useWalletStore((state) => state.mnemonic)
  const [pathTypes, setPathTypes] = useState<string[]>([]);
  const [wallets, setWallets] = useState<wallet[]>([]);

  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<boolean[]>([])

  const clearAllWallets = () => {

  }
  const generateWallets = () => {
    const seed = mnemonicToSeedSync(mnemonic)
    const hexSeed = seed.toString('hex')

    const newWallets: wallet[] = []

    for (let i = 0; i < 4; i++) {
      const path = `m/44'/501'/0'/0'/${i}`;
      const derivedSeed = derivePath(path, hexSeed).key;
      const secret = Keypair.fromSecretKey(derivedSeed)
      const publicKey = secret.publicKey.toBase58()
      const privateKey = Buffer.from(secret.secretKey).toString('hex')

      const wallet = {
        privateKey, publicKey, path
      }
      newWallets.push(wallet)
    }
    setWallets([...wallets, ...newWallets])       //append not replace
  }

  const deleteWallets = () => {
    //logic to be added
  }

  const toggleVisiblePrivateKeys = (index: number) => {
    setVisiblePrivateKeys(
      visiblePrivateKeys.map((visible, i) => (
        i === index ? !visible : visible
      ))
    )
  }

  return (
    <div>
      <button onClick={generateWallets}> Generate Wallets</button>

      {wallets.map((wallet, index) => (
        <div key={wallet.publicKey}></div>
      ))}
    </div>
  )
}
