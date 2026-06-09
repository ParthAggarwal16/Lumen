// initialising wallet generator 

import { useState } from "react"
import { useWalletStore } from "./store/walletStore.ts"
import { WalletCard } from "./walletCard.tsx"
import { ChevronDown, ChevronUp } from "lucide-react"
import { generateWallets } from "../src/utils/generateWallets.ts"
import Button from "./button.tsx"
import { toast } from "sonner"

const WalletGenerator = () => {
  const wallets = useWalletStore((state) => state.wallets)
  const clearWallets = useWalletStore((state) => state.clearWallets)
  const mnemonicDisplay = useWalletStore((state) => state.mnemonic)
  const addWallets = useWalletStore((state) => state.addWallets)

  const [isSeedOpen, setIsSeedOpen] = useState(false)

  const words = mnemonicDisplay.split(" ")

  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<boolean[]>(
    Array(wallets.length).fill(false)
  )

  const toggleVisiblePrivateKeys = (index: number) => {
    setVisiblePrivateKeys(
      visiblePrivateKeys.map((visible, i) =>
        i === index ? !visible : visible
      )
    )
  }

  const handleCopy = () => {
    if (mnemonicDisplay) {
      navigator.clipboard.writeText(mnemonicDisplay)
      toast.success("Seed Phrase Copied")
    }
  }

  const handleAddWallet = () => {
    const newWallet = generateWallets(mnemonicDisplay, wallets.length, 1)[0]
    addWallets(newWallet)
    setVisiblePrivateKeys([...visiblePrivateKeys, false])
    toast.success("New Wallet Added")
  }

  return (
    <div className="w-full">

      <div className="flex items-center justify-between mb-6">

        <button onClick={() => setIsSeedOpen(prev => !prev)} className="flex items-center gap-2 font-plex text-lumen-text">
          <span>Your Secret Phrase</span>
          {isSeedOpen ? <ChevronUp /> : <ChevronDown />}
        </button>

        <div className="flex gap-3">
          <Button onClick={handleAddWallet}>Add Wallet</Button>
          <Button onClick={() => {
            clearWallets()
            toast.success("All Wallets cleared")
          }}> Clear Wallets</Button>
        </div>

      </div>

      {isSeedOpen && (
        <div onClick={handleCopy} className="mb-6 p-4 bg-lumen-bg border border-lumen-border rounded-2xl cursor-pointer hover:bg-lumen-hover transition-colors">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {words.map((word, index) => (
              <div key={index} className="p-2 bg-lumen-bg border border-lumen-border rounded-lg text-lumen-text text-center text-sm font-plex">
                {word}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {wallets.map((wallet, index) => (
          <WalletCard
            key={wallet.publicKey}
            wallet={wallet}
            index={index}
            isVisible={visiblePrivateKeys[index]}
            onToggleVisibility={toggleVisiblePrivateKeys}
          />
        ))}
      </div>

    </div>
  )
}

export default WalletGenerator
