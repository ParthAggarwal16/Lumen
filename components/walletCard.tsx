import { useSolanaBalance } from "../src/utils/solanaBalance"
import { Eye, EyeOff } from "lucide-react"

interface WalletCardProps {
  wallet: {
    publicKey: string,
    privateKey: string,
    path: string
  }
  index: number
  isVisible: boolean
  onToggleVisibility: (index: number) => void
}

export function WalletCard({ wallet, index, isVisible, onToggleVisibility }: WalletCardProps) {
  const { loading, balance, error, usdcBalance } = useSolanaBalance(wallet.publicKey)

  return (
    <div className="border p-4 my-2">

      <p>Wallet #{index + 1}</p>

      <p>Public: {wallet.publicKey.slice(0, 8)}...</p>

      <button onClick={() => onToggleVisibility(index)}>
        {isVisible ? <EyeOff /> : <Eye />}
      </button>

      <p>Solana: {loading ? "Loading..." : `${balance} SOL`}</p>
      {isVisible && <p>Private: {wallet.privateKey}</p>}

      <p> USDC: {loading ? "loading..." : `${usdcBalance} USDC`} </p>

      {error && <p className="text-red-500"> {error}</p>}


    </div>
  )
}
