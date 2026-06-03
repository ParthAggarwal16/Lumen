import { useEffect, useState } from "react"

export function useSolPrice() {
  const [price, setPrice] = useState<number | null>(null)

  useEffect(() => {
    const fetchPrice = async () => {

      try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")

        const data = await response.json()
        setPrice(data.solana.usd)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPrice()
  }, [])
  return price
}
