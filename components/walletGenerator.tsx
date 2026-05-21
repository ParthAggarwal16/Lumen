// initialising wallet generator 

import { useState } from "react"
import { useWalletStore } from "./store/walletStore.ts"
import { WalletCard } from "./walletCard.tsx"
import { ChevronDown, ChevronUp } from "lucide-react"

const WalletGenerator = () => {
  const wallets = useWalletStore((state) => state.wallets)
  const clearWallets = useWalletStore((state) => state.clearWallets)
  const mnemonicDisplay = useWalletStore((state) => state.mnemonic)
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

  return (
    <div>

      <button onClick={clearWallets}> Clear Wallets </button>

      <div className="mt-4">

        <button
          onClick={() => setIsSeedOpen(prev => !prev)} className="flex items-center gap-2">

          <span>Your Secret Phrase</span> {isSeedOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {isSeedOpen && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <div className="grid grid-cols-4 gap-2">
              {words.map((word, index) => (
                <div key={index} className="p-2 bg-gray-900 rounded text-white text-center text-sm"> {word}</div>
              ))}
            </div>
          </div>
        )}
      </div>

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
  )
}

export default WalletGenerator
