// initialising wallet generator 

import MnemonicGenerator from "../components/MnemonicGenerator.tsx"
import { Keypair } from "@solana/web3.js"
import { derivePath } from "ed25519-hd-key"
import { useWalletStore, Wallet } from "./store/walletStore.ts"
import { mnemonicToSeedSync } from "bip39"
import { useState } from "react"
import { WalletCard } from "./walletCard.tsx"

const WalletGenerator = () => {
  const mnemonic = useWalletStore((state) => state.mnemonic)
  const [pathTypes, setPathTypes] = useState<string[]>([]);

  const wallets = useWalletStore((state) => state.wallets)
  const setWallets = useWalletStore((state) => state.setWallets)
  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<boolean[]>([])

  const generateWallets = () => {
    if (!mnemonic || mnemonic.trim() === "") {
      alert("Please Generate a seed ")
      return
    }
    const seed = mnemonicToSeedSync(mnemonic)
    const hexSeed = seed.toString('hex')

    const newWallets: Wallet[] = []

    for (let i = 0; i < 4; i++) {
      const path = `m/44'/501'/${i}'/0'`;
      const derivedSeed = derivePath(path, hexSeed).key;
      const keypair = Keypair.fromSeed(derivedSeed)
      const publicKey = keypair.publicKey.toBase58()
      const privateKey = Buffer.from(keypair.secretKey).toString('hex')

      const wallet = {
        privateKey, publicKey, path
      }
      newWallets.push(wallet)
    }
    setWallets([...wallets, ...newWallets])       //append not replace
    setVisiblePrivateKeys([...visiblePrivateKeys, ...Array(newWallets.length).fill(false)])
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

        <WalletCard
          key={wallet.publicKey}
          wallet={wallet}
          index={index}
          isVisible={visiblePrivateKeys[index]}
          onToggleVisibility={toggleVisiblePrivateKeys}
        />
      ))}
    </div>
  )
}

export default WalletGenerator
