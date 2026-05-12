// this will fetch solana balance 
// and show it on a check balance 
// and handle errors

import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js"
import { useEffect } from "react"

export function useSolanaBalance(publicKey: string) {
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSolanaBalance = async () => {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

      const balanceInLamports = await connection.getBalance(publicKey)

      const balanceInSolana = balanceInLamports / LAMPORTS_PER_SOL
    }
    fetchSolanaBalance()
  }, [publicKey])
  return { balance, loading }
}
