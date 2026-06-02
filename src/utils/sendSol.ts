// utility to sned solana
// cureentl taking some 
// inspo from solflare

import { Connection, SystemProgram, Transaction, clusterApiUrl, Keypair, PublicKey, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from "@solana/web3.js"

export async function sendSol(
  senderKeypair: Keypair,
  recepeintAddress: string,
  amount: number
) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
  const recepeintPublicKey = new PublicKey(recepeintAddress)

  // Transaction code here:
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: senderKeypair.publicKey,
      toPubkey: recepeintPublicKey,
      lamports: amount * LAMPORTS_PER_SOL
    })
  )

  //signature:
  const signature = await sendAndConfirmTransaction(
    connection, transaction, [senderKeypair]
  )
  return signature
}
