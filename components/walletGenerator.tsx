// initialising wallet generator 

import { useState } from "react"
import { useWalletStore } from "./store/walletStore.ts"
import { WalletCard } from "./walletCard.tsx"
import { ChevronDown, ChevronUp } from "lucide-react"
import { generateWallets } from "../src/utils/generateWallets.ts"
import Button from "./button.tsx"

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
      return navigator.clipboard.writeText(mnemonicDisplay)
    }
  }

  const handleAddWallet = () => {
    const newWallet = generateWallets(mnemonicDisplay, wallets.length, 1)[0]
    addWallets(newWallet)
    setVisiblePrivateKeys([...visiblePrivateKeys, false])
  }

  return (
    <div>

      <button onClick={clearWallets}> Clear Wallets </button>

      <button onClick={handleAddWallet}> Add Wallet</button>

      <div className="mt-4">

        <button
          onClick={() => setIsSeedOpen(prev => !prev)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>

          <span>Your Secret Phrase</span> {isSeedOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {isSeedOpen && (
          <div onClick={handleCopy} className="mt-4 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
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
