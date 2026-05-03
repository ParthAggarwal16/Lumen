// initialising wallet generator 

import MnemonicGenerator from "../components/MnemonicGenerator.tsx"
import nacl from "tweetnacl"
import { Keypair } from "@solana/web3.js"
import { derivePath } from "ed25519-hd-key"
import { mnemonicToSeedSync } from "bip39"
import { useState } from "react"

interface wallet {
  publicKey: string
  privateKey: string
  path: string
}

const seed = mnemonicToSeedSync()
const walletGenerator = () => {
  const [pathTypes, setPathTypes] = useState<string[]>([]);
  const [wallets, setWallets] = useState<wallet[]>([]);
  const clearAllWallets = () => {

  }
  const generateWallets = () => {
    //logic to be added
  }
  const deleteWallets = () => {
    //logic to be added
  }
  return ()
}
