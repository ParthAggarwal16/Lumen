//Takes: fromToken, toToken, amount, wallet
//Calls Jupiter API
//Builds & sends transaction
//Returns signature or error

import { clusterApiUrl, Connection, Keypair, VersionedTransaction } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

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

  const qouteResponse = await fetch(`https://lite-api.jup.ag/swap/v1/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountInSmallestUnit}&slippageBps=50`)

  if (!qouteResponse.ok) {
    throw new Error("Failed to fetch quote")
  }

  const qouteData = await qouteResponse.json()

  const swapResopnse = await fetch("https://lite-api.jup.ag/swap/v1/swap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      quoteResponse: qouteData,
      userPublicKey: wallet.publicKey.toBase58(),
      wrapAndUnwrapSol: true,
      dynamicComputeUnitLimit: true,
      prioritizationFeeLamports: "auto"
    })
  })

  if (!swapResopnse.ok) {
    throw new Error("Failed to build swap transaction")
  }

  const swapData = await swapResopnse.json()

  const transactionBuffer = Buffer.from(swapData.swapTransaction, "base64")

  const transaction = VersionedTransaction.deserialize(transactionBuffer)

  transaction.sign([wallet])

  const signature = await connection.sendTransaction(transaction)

  const latestBlockhash = await connection.getLatestBlockhash()

  await connection.confirmTransaction({
    signature: signature,
    blockhash: latestBlockhash.blockhash,
    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
  })

  return signature
}
