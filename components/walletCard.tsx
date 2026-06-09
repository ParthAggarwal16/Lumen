import { useSolanaBalance } from "../src/utils/solanaBalance"
import { Eye, EyeOff } from "lucide-react"
import Button from "./button"
import { useEffect, useState } from "react"
import SendModal from "../components/sendModal.tsx"
import { toast } from "sonner"

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

  const [refreshKey, setRefreshKey] = useState(0)
  const { loading, balance, error, usdcBalance } = useSolanaBalance(wallet.publicKey, refreshKey)
  const [isSendModalOpen, setIsSendModalOpen] = useState(false)

  useEffect(() => {
    if (error && error.includes("Rate limited")) {
      toast.error("Rate limited. Please wait a moment.")
    }
  }, [error])

  return (
    <div className="border border-lumen-border bg-lumen-surface rounded-2xl p-5 font-plex">

      <p className="text-lg text-lumen-text mb-3">Wallet #{index + 1}</p>

      <div className="mb-3">
        <p className="text-xs text-zinc-500 mb-1">Public Key</p>
        <p className="text-sm text-zinc-300 break-all">
          {wallet.publicKey}
        </p>
      </div>

      <button onClick={() => onToggleVisibility(index)} className="flex items-center gap-2 text-sm text-lumen-text hover:text-white transition-colors">
        <span>Private Key</span>
        {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>

      {isVisible && (
        <p className="mt-3 text-sm text-zinc-400 break-all">
          {wallet.privateKey}
        </p>
      )}

      <div className="mt-4 space-y-1">
        <p className="text-lumen-text">
          Solana: {loading ? "Loading..." : `${balance} SOL`}
        </p>

        <p className="text-lumen-text">
          USDC: {loading ? "Loading..." : `${usdcBalance ?? 0} USDC`}
        </p>
      </div>
      <Button className="mt-4" onClick={() => setIsSendModalOpen(true)}>
        Send
      </Button>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      {isSendModalOpen && (
        <SendModal
          wallet={wallet}
          onclose={() => setIsSendModalOpen(false)}
          onSuccess={() => setRefreshKey(prev => prev + 1)} />
      )}

    </div>
  )
}
