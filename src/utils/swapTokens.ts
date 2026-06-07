//Takes: fromToken, toToken, amount, wallet
//Calls Jupiter API
//Builds & sends transaction
//Returns signature or error

import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
const SOL_MINT = "So11111111111111111111111111111111111111112"
const USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"

interface SwapParams {
  wallet: Keypair
  account: string,
  fromToken: "SOL" | "USDC",
  toToken: "USDC" | "SOL",
  amount: number
}

export async function swap({ account, wallet, amount, fromToken, toToken }: SwapParams) {
  const inputMint = fromToken === "SOL" ? SOL_MINT : USDC_MINT
  const outputMint = toToken === "SOL" ? SOL_MINT : USDC_MINT

  const amountInSmallestUnits = fromToken === "SOL" ? amount * 100_000_000 : amount * 100_000

  const qouteResponse = await fetch("https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountInSmallestUnit}&slippageBps=50")
  const qouteData = await qouteResponse.json()
  // now i get swap transaction somehow

}
