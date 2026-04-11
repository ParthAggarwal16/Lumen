// this will generate seed and display it 

import { generateMnemonic } from "bip39"
import { useState } from "react"
const MnemonicGenerator = () => {

  const [mnemonic, setMnemonic] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const generateSeed = () => {
    const newMnemonic = generateMnemonic()
    setMnemonic(newMnemonic)
    setIsOpen(true)
  }

  return (
    <div>
      <button onClick={generateSeed}>
        Generate Seed
      </button>
      <button onClick={() => mnemonic && setIsOpen(prev => !prev)}></button>
      {mnemonic && <p className="mt-4 px-4 py-2 bg-white hover:bg-gray-900 rounded text-black font-semibold">{mnemonic}</p>}
    </div>
  )
}

export default MnemonicGenerator
