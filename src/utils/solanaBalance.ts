// this will fetch solana balance 
// and show it on a check balance 
// and handle errors

import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js"
import { useEffect, useState } from "react"
import { PublicKey } from "@solana/web3.js"

export function useSolanaBalance(publicKey: string) {
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSolanaBalance = async () => {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

      const publicKeyObj = new PublicKey(publicKey)
      const balanceInLamports = await connection.getBalance(publicKeyObj)

      const balanceInSolana = balanceInLamports / LAMPORTS_PER_SOL
      setBalance(balanceInSolana)
    }
    fetchSolanaBalance()
  }, [publicKey])
  return { balance, loading }
}
