import { ArrowDownUp } from "lucide-react"
import { useState } from "react"
import { Keypair } from "@solana/web3.js"
import Button from "./button"
import { swap } from "../src/utils/swapTokens"
import { useSwapQoute } from "../src/hooks/useSwapQoute"
import { toast } from "sonner"
import { useSolPrice } from "../src/hooks/fetchusd"

interface SwapModalProps {
  wallet: {
    publicKey: string
    privateKey: string
  }
  onclose: () => void
  onSuccess: () => void
}

export default function SwapModal({ wallet, onclose, onSuccess }: SwapModalProps) {
  const [fromToken, setFromToken] = useState<"SOL" | "USDC">("SOL")
  const [toToken, setToToken] = useState<"SOL" | "USDC">("USDC")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const solPrice = useSolPrice()

  const usdValue = fromToken === "SOL" ? (Number(amount) * (solPrice ?? 0)).toFixed(2) : amount

  const quote = useSwapQoute(amount, toToken, fromToken)

  const handleSwapDirection = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setAmount("")
  }

  const handleSwap = async () => {
    try {
      if (!amount || Number(amount) <= 0) {
        setError("Enter a valid amount")
        toast.error("Enter a valid amount")
        return
      }

      setLoading(true)
      setError("")

      const secretKey = Uint8Array.from(Buffer.from(wallet.privateKey, "hex"))
      const keypair = Keypair.fromSecretKey(secretKey)

      const signature = await swap({
        wallet: keypair,
        fromToken,
        toToken,
        amount: Number(amount)
      })

      console.log(signature)

      toast.success("Swap Successful")

      onSuccess()
      onclose()

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        toast.error(error.message)
      } else {
        setError("Swap failed")
        toast.error("Swap failed")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-3xl border border-lumen-border bg-lumen-surface p-6 font-plex">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-semibold text-lumen-text"> Swap </h2>

          <button onClick={onclose} className="text-2xl text-zinc-400 transition-colors hover:text-white">
            ×
          </button>

        </div>

        <div className="space-y-4">

          <div className="rounded-3xl bg-lumen-bg p-6">

            <p className="mb-3 text-sm tracking-widest text-zinc-500"> SELL </p>

            <p className="mt-3 text-sm text-zinc-500"> ≈ ${usdValue} USD </p>

            <div className="flex items-center justify-between">

              <input type="number" placeholder="0"
                value={amount} onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent text-5xl font-semibold text-lumen-text outline-none" />

              <div className="ml-4 rounded-2xl border border-lumen-border bg-lumen-surface px-4 py-3 text-xl text-lumen-text">
                {fromToken}
              </div>

            </div>

          </div>

          <div className="flex justify-center">

            <button onClick={handleSwapDirection}
              className="rounded-full border border-lumen-border bg-lumen-surface p-4 text-lumen-text transition-all duration-150 hover:bg-lumen-hover active:scale-95">
              <ArrowDownUp size={22} /> </button>

          </div>

          <div className="rounded-3xl bg-lumen-bg p-6">

            <p className="mb-3 text-sm tracking-widest text-zinc-500"> BUY </p>

            <div className="flex items-center justify-between">

              <div className="text-5xl font-semibold text-lumen-text">
                {quote ?? "0"}
              </div>

              <div className="ml-4 rounded-2xl border border-lumen-border bg-lumen-surface px-4 py-3 text-xl text-lumen-text">
                {toToken}
              </div>

            </div>

          </div>

          {quote && Number(amount) > 0 && (
            <p className="px-2 text-sm text-zinc-400">
              1 {fromToken} ≈ {(quote / Number(amount)).toFixed(4)} {toToken}
            </p>
          )}

          {error && (
            <div className="rounded-2xl border border-red-900 bg-red-950/40 p-4">

              <p className="mb-1 text-lg text-red-400"> Swap Error </p>

              <p className="text-sm text-red-300"> {error} </p>

            </div>
          )}

          <Button
            onClick={handleSwap}
            className="w-full py-4 text-lg"
          >
            {loading ? "Swapping..." : `Swap ${fromToken} → ${toToken}`}
          </Button>

        </div>

      </div>

    </div>
  )
}
