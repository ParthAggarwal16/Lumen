import MnemonicGenerator from "../components/MnemonicGenerator.tsx"
import WalletGenerator from "../components/WalletGenerator.tsx"
import { useWalletStore } from "../components/store/walletStore.ts"
import { motion } from "framer-motion"

export default function Home() {
  const wallets = useWalletStore((state) => state.wallets)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="p-6 flex-1">
        {wallets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl font-black tracking-tight text-lumen-text font-plex mb-4">
              Lumen
            </h1>

            <p className="text-xl text-zinc-400 max-w-xl leading-relaxed italic mb-4">
              A web based crypto wallet built on top of solana
            </p>
          </motion.div>
        )}

        {wallets.length > 0 ? <WalletGenerator /> : <MnemonicGenerator />}
      </div>

      <div className="fixed bottom-6 left-6 text-base text-zinc-500">
        Developed with love by{" "}
        <a
          href="https://github.com/ParthAggarwal16"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lumen-text underline hover:text-white transition-colors"
        >
          Parth
        </a>
      </div>
    </div>
  )
}
