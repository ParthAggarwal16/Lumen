// this will generate seed and display it 

import { generateMnemonic } from "bip39"
import { useState } from "react"
const MnemonicGenerator = () => {
  const [mnemonic, setMnemonic] = useState<string>('')
  const generateSeed = () => {
    const newMnemonic = generateMnemonic()
    setMnemonic(newMnemonic)
  }
  return (
    <div>
      <button onClick={generateSeed}>
        Generate Seed
      </button>
      {mnemonic && <p className="mt-4 text-sm">{mnemonic}</p>}
    </div>
  )
}

export default MnemonicGenerator
