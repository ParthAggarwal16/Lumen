// utility to sned solana
// cureentl taking some 
// inspo from solflare

import { Connection, SystemProgram, Transaction, clusterApiUrl, Keypair } from "@solana/web3.js"

export async function sendSol(
  senderKeypair: Keypair,
  receiverKeypair: Keypair,
  amount: number
)
