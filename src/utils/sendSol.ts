// utility to sned solana
// cureentl taking some 
// inspo from solflare

import { Connection, SystemProgram, Transaction, clusterApiUrl, Keypair, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js"

export async function sendSol(
  senderKeypair: Keypair,
  receiverAddress: string
  amount: number
) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
  const recepeintPublicKey = new PublicKey(receiverAddress)

  // Transaction code here:
  const transaction = new Transaction

  //signature:
  const signature = await sendAndConfirmTransaction(
    connection, [senderKeypair], transaction
  )
}
