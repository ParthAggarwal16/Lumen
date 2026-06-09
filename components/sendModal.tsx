import { useState } from "react"
import { useSolPrice } from "../src/hooks/fetchusd.ts"
import { Keypair, PublicKey } from "@solana/web3.js"
import { sendSol } from "../src/utils/sendSol.ts"
import Button from "./button.tsx"
import { toast } from "sonner"

interface SendModalProps {
  wallet: {
    publicKey: string,
    privateKey: string
  }
  onclose: () => void
  onSuccess: () => void
}

export default function SendModal({ wallet, onclose }: SendModalProps) {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const solPrice = useSolPrice()

  const usdValue = solPrice && amount ? (solPrice * Number(amount)).toFixed(2) : "0.00"

  const handleSend = async () => {
    try {
      if (!recipient || !amount) {
        setError("Please fill the required field")
        toast.error("Please fill the required field")
        return
      }
      if (!PublicKey.isOnCurve(recipient)) {
        setError("Invalid Solana Address")
        toast.error("Invalid Solana Address")
        return
      }
      if (Number(amount) <= 0) {
        setError("Amount must be greater than 0")
        toast.error("Invalid Amount")
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
      toast.success("Transaction Successful")
      setLoading(false)
      onclose()

      setTimeout(() => {
        window.location.reload()
      }, 1200)

    } catch (error) {
      setLoading(false)
      if (error instanceof Error) {
        if (error.message.includes("insufficient lamports")) {
          setError("Cannot send full balance because Solana requires gas fees")
          toast.error("Keep some SOL for gas fees")
        } else {
          setError(error.message)
          toast.error(error.message)
        }
      }
      else {
        setError("Transaction Failed")
      }
    }
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-lg rounded-2xl border border-lumen-border bg-lumen-surface p-6 font-plex">

        <h2 className="text-2xl text-lumen-text mb-6"> Send SOL </h2>

        <div className="space-y-4">

          <input
            type="text" placeholder="Recipient Address"
            value={recipient} onChange={(e) => setRecipient(e.target.value)}
            className="w-full rounded-lg border border-lumen-border bg-lumen-bg p-3 text-lumen-text outline-none" />

          <div>

            <input
              type="number" placeholder="Amount"
              value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-lumen-border bg-lumen-bg p-3 text-lumen-text outline-none" />

            <p className="mt-2 text-sm text-zinc-400"> ≈ ${usdValue} USD </p>

          </div>

          {error && (<p className="text-red-500 text-sm">{error}</p>)}

          <div className="flex justify-end gap-3 pt-2">

            <Button onClick={onclose}> Cancel </Button>

            <Button onClick={handleSend}> {loading ? "Sending..." : "Send"} </Button>

          </div>
        </div>
      </div>

    </div>

  )
}


