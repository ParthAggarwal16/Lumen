// initialising wallet generator 

import { useState } from "react"
import { useWalletStore } from "./store/walletStore.ts"
import { WalletCard } from "./walletCard.tsx"

const WalletGenerator = () => {
  const wallets = useWalletStore((state) => state.wallets)
  const clearWallets = useWalletStore((state) => state.clearWallets)

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
