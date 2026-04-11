//emptying this for now 

import MnemoicGenerator from "../components/MnemonicGenerator.tsx"

export default function Home() {
  return (
    <div className="min-h-screen flex item-center justify-centre bg-black text-white">
      <article className="p-6 bg-gray-900 rounded-lg">
        <h1 className="text-2xl font-bold mb-2"> Lumen </h1>
        <p className="text-gray-400"> Lumen is a web based wallet on top of solana </p>
        <MnemoicGenerator />
      </article>
    </div>
  )
}

//mt-4 px-4 py-2 bg-white hover: bg-gray-900 rounded text-black font-semibold
