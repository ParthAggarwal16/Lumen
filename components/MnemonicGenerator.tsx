// this will generate seed and display it 

import { generateMnemonic, validateMnemonic } from "bip39"
import { useState } from "react"
import { useWalletStore } from "../components/store/walletStore.ts"
import { generateWallets } from "../src/utils/generateWallets.ts"

const MnemonicGenerator = () => {
  const setMnemonic = useWalletStore((state) => state.setMnemonic)
  const setWallets = useWalletStore((state) => state.setWallets)

  const [inputSeed, setInputSeed] = useState("")

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const mnemonic = useWalletStore((state) => state.mnemonic)

  const generateSeed = () => {
    const newMnemonic = generateMnemonic()

    const wallets = generateWallets(newMnemonic)

    setMnemonic(newMnemonic)

    setWallets(wallets)

    setIsOpen(true)
  }

  const importSeed = () => {
    const trimSeed = inputSeed.trim()
    if (!trimSeed) {
      return
    }
    const isValid = validateMnemonic(trimSeed)
    if (!isValid) {
      alert("Invalid Secret Phrase")
      return
    }

    const importedWallets = generateWallets(trimSeed)
    setMnemonic(trimSeed)
    setWallets(importedWallets)
    setIsOpen(true)
    setInputSeed("")
  }

  const words = mnemonic.split(" ")

  const handleCopy = () => {
    if (mnemonic) {
      return navigator.clipboard.writeText(mnemonic)
    }
  }

  return (
    <div>
      <div className="flex gap-2">

        <button onClick={generateSeed}>
          Generate Seed
        </button>

        <input type="text" placeholder="Enter Your Secret Phrase" value={inputSeed}
          onChange={(e) => setInputSeed(e.target.value)} className="flex-1 p-2 rounded bg-gray-800 text-white" />

        <button onClick={importSeed}> Import Seed </button>

      </div>

      {isOpen && mnemonic && (
        <div
          onClick={handleCopy}
          className="mt-4 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700">

          <div className="grid grid-cols-4 gap-2">
            {words.map((word, index) => (
              <div
                key={index}
                className="p-2 bg-gray-900 rounded text-white text-center text-sm">

                {word}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MnemonicGenerator
