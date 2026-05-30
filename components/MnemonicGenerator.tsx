// this will generate seed and display it 

import { generateMnemonic, validateMnemonic } from "bip39"
import { useState } from "react"
import { useWalletStore } from "../components/store/walletStore.ts"
import { generateWallets } from "../src/utils/generateWallets.ts"
import Button from "./button.tsx"

const MnemonicGenerator = () => {
  const setMnemonic = useWalletStore((state) => state.setMnemonic)
  const setWallets = useWalletStore((state) => state.setWallets)

  const [inputSeed, setInputSeed] = useState("")

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

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



  return (
    <div>
      <div className="flex gap-3">

        <Button onClick={generateSeed}>Create New Wallet</Button>

        <Button onClick={() => { setIsImportModalOpen(true) }}> Import Seed </Button>

      </div>
      {isImportModalOpen && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">

          <div className="bg-lumen-surface border border-lumen-border p-6 rounded-2x1 w-full max-w-lg shadow-2x1">

            <h2 className="text-xl font-plex mb-4">Import Secret Phrase</h2>

            <input type="text" placeholder="Enter Your Secret Phrase"
              value={inputSeed} onChange={(e) => setInputSeed(e.target.value)}
              className="w-full p-3 rounded-lg bg-lumen-bg border border-lumen-border text-lumen-text font-plex outline-none focus:border-lumen-text transition-colors" />

            <div className="flex justify-end gap-2 mt-4">

              <Button onClick={() => { setIsImportModalOpen(false) }}> Cancel </Button>
              <Button onClick={() => {
                importSeed()
                setIsImportModalOpen(false)
              }}> Import </Button>

            </div>


          </div>
        </div>
      )}

      {isOpen && mnemonic && (
        <div
          className="mt-4 p-4 bg-lumen-surface border border-lumen-border rounded-lg cursor-pointer hover:bg-lumen-hover transition-colors">

          <div className="grid grid-cols-4 gap-2">
            {words.map((word, index) => (
              <div
                key={index}
                className="p-2 bg-lumen-bg border border-lumen-border rounded-md text-lumen-text text-center text-sm font-plex">

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
