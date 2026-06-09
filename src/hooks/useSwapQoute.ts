//Token A input (amount)
//Token B selector
//Get quote (from Jupiter)
//Confirm & execute swap
//Show loading/error states

import { useState, useEffect } from "react"
import { SOL_MINT, USDC_MINT } from "../utils/swapTokens"

export function useSwapQoute(amount: string, toToken: "SOL" | "USDC", fromToken: "SOL" | "USDC") {
  const [quote, setQuote] = useState<number | null>(null)

  useEffect(() => {
    const fetchQuote = async () => {
      if (!amount || Number(amount) === 0) {
        setQuote(null)
        return
      }

      try {
        const inputMint = fromToken === "SOL" ? SOL_MINT : USDC_MINT
        const outputMint = toToken === "SOL" ? SOL_MINT : USDC_MINT
        const amountInSmallestUnit = fromToken === "SOL" ? Number(amount) * 1_000_000_000 : Number(amount) * 1_000_000

        const response = await fetch("http://localhost:3001/api/swap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inputMint,
            outputMint,
            amount: amountInSmallestUnit,
            userPublicKey: "11111111111111111111111111111111"
          })
        })

        if (!response.ok) throw new Error("Failed to fetch quote")

        const data = await response.json()
        const outAmount = toToken === "SOL" ? Number(data.outAmount) / 1_000_000_000 : Number(data.outAmount) / 1_000_000
        setQuote(outAmount)
      } catch (e) {
        console.error("Quote error:", e)
        setQuote(null)
      }
    }

    fetchQuote()
  }, [amount, toToken, fromToken])

  return quote
}
