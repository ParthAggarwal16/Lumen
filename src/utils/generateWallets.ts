import { Keypair } from "@solana/web3.js"
import { derivePath } from "ed25519-hd-key"
import { mnemonicToSeedSync } from "bip39"
import type { Wallet } from "../../components/store/walletStore"

export function generateWallets(mnemonic: string): Wallet[] {
  const seed = mnemonicToSeedSync(mnemonic)

  const hexSeed = seed.toString("hex")

  const wallets: Wallet[] = []

  for (let i = 0; i < 4; i++) {
    const path = `m/44'/501'/${i}'/0'`

    const derivedSeed = derivePath(path, hexSeed).key

    const keypair = Keypair.fromSeed(derivedSeed)

    const publicKey = keypair.publicKey.toBase58()

    const privateKey = Buffer.from(keypair.secretKey).toString("hex")

    wallets.push({
      publicKey,
      privateKey,
      path,
    })
  }

  return wallets
}
