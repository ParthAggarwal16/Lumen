//Takes: fromToken, toToken, amount, wallet
//Calls Jupiter API
//Builds & sends transaction
//Returns signature or error

import { Keypair, VersionedTransaction } from "@solana/web3.js";


export const SOL_MINT = "So11111111111111111111111111111111111111112"
export const USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"

interface SwapParams {
  wallet: Keypair
  fromToken: "SOL" | "USDC",
  toToken: "USDC" | "SOL",
  amount: number
}

export async function swap({ wallet, amount, fromToken, toToken }: SwapParams) {
  const inputMint = fromToken === "SOL" ? SOL_MINT : USDC_MINT
  const outputMint = toToken === "SOL" ? SOL_MINT : USDC_MINT

  const amountInSmallestUnit = fromToken === "SOL" ? amount * 1_000_000_000 : amount * 1_000_000

  // Call your backend instead of Jupiter directly
  const orderResponse = await fetch("http://localhost:3001/api/swap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inputMint,
      outputMint,
      amount: amountInSmallestUnit,
      userPublicKey: wallet.publicKey.toBase58()

    })
  })

  if (!orderResponse.ok) {
    throw new Error("Failed to fetch quote")
  }

  const orderData = await orderResponse.json()

  const transactionBuffer = Buffer.from(orderData.swapTransaction, "base64")
  const transaction = VersionedTransaction.deserialize(transactionBuffer)

  transaction.sign([wallet])

  const executeResponse = await fetch("http://localhost:3001/api/execute-swap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      swapTransaction: Buffer.from(transaction.serialize()).toString("base64")
    })
  })

  if (!executeResponse.ok) {
    throw new Error("Failed to execute swap")
  }

  const executeData = await executeResponse.json()
  return executeData.txId
}
