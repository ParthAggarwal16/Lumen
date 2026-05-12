//emptying this for now 

import MnemonicGenerator from "../components/MnemonicGenerator.tsx"
import WalletGenerator from "../components/WalletGenerator.tsx"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <article className="p-6 bg-gray-900 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Lumen</h1>

        <p className="text-gray-400 mb-4">
          Lumen is a web based wallet on top of solana
        </p>

        <MnemonicGenerator />

        <WalletGenerator />
      </article>
    </div>
  )
}
