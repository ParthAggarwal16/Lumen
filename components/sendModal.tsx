import { useState } from "react"

interface SendModalProps {
  wallet: {
    publicKey: string,
    privateKey: string
  }
  onclose: () => void
}

export default function SendModal({ wallet, onclose }: SendModalProps) {
  const [recipient, setrecipient] = useState("")
  const [Amount, setAmount] = useState("")
  const [error, setError] = useState("")


}
