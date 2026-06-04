import { useState } from "react"
import { useSolPrice } from "../src/hooks/fetchusd.ts"
import { Keypair } from "@solana/web3.js"
import { sendSol } from "../src/utils/sendSol.ts"

interface SendModalProps {
  wallet: {
    publicKey: string,
    privateKey: string
  }
  onclose: () => void
}

export default function SendModal({ wallet, onclose }: SendModalProps) {
  const [recipient, setrecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useSolPrice(false)
  const solPrice = useSolPrice()

  const usdValue = solPrice && amount ? (solPrice * Number(amount)).toFixed(2) : "0.00"
  const handleSend = async () => {
    setLoading(true)

    const secretKey = Uint8Array.from(Buffer.from(wallet.privateKey, "hex"))
    const senderKeypair = Keypair.fromSecretKey(secretKey)
    const signature = await sendSol(
      senderKeypair,
      recipient,
      Number(amount)
    )
    console.log(signature)
    setLoading(false)
    onclose()
  }
}
