//Token A input (amount)
//Token B selector
//Get quote (from Jupiter)
//Confirm & execute swap
//Show loading/error states

import { useState, useEffect } from "react";
import { SOL_MINT, USDC_MINT } from "../utils/swapTokens";

export function useSwapQoute(amount: string, toToken: "SOL" | "USDC", fromToken: "SOL" | "USDC") {
  const [quote, setQoute] = useState<number | null>(null)
  useEffect(() => {
    const fetchQoute = async () => {
      if (!amount || Number(amount) == 0) {
        setQoute(null)
        return
      }
      try {
        const inputMint = fromToken === "SOL" ? SOL_MINT : USDC_MINT
        const outputMint = toToken === "SOL" ? SOL_MINT : USDC_MINT
        const amountInSmallesUnit = fromToken === "SOL" ? Number(amount) * 1_000_000_000 : Number(amount) * 1_000_000

        const response = await fetch(`https://lite-api.jup.ag/swap/v1/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountInSmallesUnit}&slippageBps=50`)
        if (!response.ok) {
          throw new Error("Failed to fetch quote")
        }
        const data = await response.json()

        if (!data.outAmount) {
          throw new Error("No swap route found")
        }

        const outAmount = toToken === "SOL" ? Number(data.outAmount) / 1_000_000_000 : Number(data.outAmount) / 1_000_000
        setQoute(outAmount)
      } catch {
        setQoute(null)
      }
    }
    fetchQoute()
  }, [amount, toToken, fromToken])
  return quote
}
