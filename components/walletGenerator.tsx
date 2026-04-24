// initialising wallet generator 

import MnemonicGenerator from "../components/MnemonicGenerator.tsx"
import nacl from "tweetnacl"
import { Keypair } from "@solana/web3.js"
import { derivePath } from "ed25519-hd-key"
import { mnemonicToSeed } from "bip39"
import { useState } from "react"

interface wallet {
  publicKey: string
  privateKey: string
  path: string
}

const walletGenerator = () => {
  const [pathTypes, setPathTypes] = useState<string[]>([]);
  const [wallets, setWallets] = useState<wallet[]>([]);
  return ()
}
