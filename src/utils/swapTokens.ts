//Takes: fromToken, toToken, amount, wallet
//Calls Jupiter API
//Builds & sends transaction
//Returns signature or error

import { clusterApiUrl, Connection } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
const SOL_MINT = "So11111111111111111111111111111111111111112"
const USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"

interface swapParams {
  account: string,
  inputToken: "SOL" | "USDC",
  outputToken: "USDC" | "SOL"
}
