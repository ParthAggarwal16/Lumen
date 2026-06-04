import { useState } from "react"
import { useSolPrice } from "../src/hooks/fetchusd.ts"
import { Keypair, PublicKey } from "@solana/web3.js"
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
  const [loading, setLoading] = useState(false)
  const solPrice = useSolPrice()

  const usdValue = solPrice && amount ? (solPrice * Number(amount)).toFixed(2) : "0.00"

  const handleSend = async () => {
    try {
      if (!recipient || !amount) {
        setError("Please fill the required field")
        return
      }
      if (!PublicKey.isOnCurve(recipient)) {
        setError("Invalid Solana Address")
        return
      }
      if (Number(amount) <= 0) {
        setError("Amount must be greater than 0")
        return
      }
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

    } catch (error) {
      setLoading(false)
      if (error instanceof Error) {
        setError(error.message)
      }
      else {
        setError("Transaction Failed")
      }
    }
  }
}
