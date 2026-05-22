//emptying this for now 

import MnemonicGenerator from "../components/MnemonicGenerator.tsx"
import WalletGenerator from "../components/WalletGenerator.tsx"
import { useWalletStore } from "../components/store/walletStore.ts"

export default function Home() {

  const wallets = useWalletStore((state) => state.wallets)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Lumen</h1>
        <p className="text-gray-400 mb-4">Lumen is a web based wallet on top of solana</p>
        {wallets.length > 0 ? <WalletGenerator /> : <MnemonicGenerator />}
      </div>
    </div>
  )
}
