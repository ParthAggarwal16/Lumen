import { useState } from "react"
import { useSolPrice } from "../src/hooks/fetchusd.ts"

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
  }
}
