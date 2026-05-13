// this will fetch solana balance 
// and show it on a check balance 
// and handle errors

import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js"
import { useEffect, useState } from "react"
import { PublicKey } from "@solana/web3.js"

export function useSolanaBalance(publicKey: string) {
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSolanaBalance = async () => {

      try {
        setLoading(true)
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

        const publicKeyObj = new PublicKey(publicKey)
        const balanceInLamports = await connection.getBalance(publicKeyObj)

        const balanceInSolana = balanceInLamports / LAMPORTS_PER_SOL
        setBalance(balanceInSolana)
        setLoading(false)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
          setLoading(false)
        } else {
          setError("unknown error")
        }
      }
    }
    fetchSolanaBalance()
  }, [publicKey])
  return { balance, loading, error }
}
