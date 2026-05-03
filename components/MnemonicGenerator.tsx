// this will generate seed and display it 

import { generateMnemonic } from "bip39"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useWalletStore } from "../components/store/walletStore.ts"

const MnemonicGenerator = () => {

  const setMnemonic = useWalletStore((state) => state.setMnemonic)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const mnemonic = useWalletStore((state) => state.mnemonic)

  const generateSeed = () => {
    const newMnemonic = generateMnemonic()
    setMnemonic(newMnemonic)
    setIsOpen(true)
  }

  const words = mnemonic.split(" ")

  const handleCopy = () => {
    if (mnemonic) {
      return navigator.clipboard.writeText(mnemonic)
    }
  }

  return (
    <div>
      <button onClick={generateSeed}>
        Generate Seed
      </button>

      <button onClick={() => mnemonic && setIsOpen(prev => !prev)}>
        {isOpen ? <ChevronDown /> : <ChevronUp />}
      </button>

      {isOpen && mnemonic && (
        <div onClick={handleCopy} className="mt-4 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700">
          <div className="grid grid-cols-4 gap-2">
            {words.map((word) => (
              <div key={word} className="p-2 bg-gray-900 rounded text-white text-center text-sm"> {word} </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default MnemonicGenerator
