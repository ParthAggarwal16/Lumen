import express from "express"
import cors from "cors"

const app = express()
const PORT = 3001
const JUPITER_API_KEY = process.env.JUPITER_API_KEY

console.log("JUPITER_API_KEY:", JUPITER_API_KEY ? "Set" : "NOT SET")

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "Server running" })
})

app.post("/api/swap", async (req, res) => {
  try {
    const { inputMint, outputMint, amount, userPublicKey } = req.body

    const url = new URL("https://api.jup.ag/swap/v2/order")
    url.searchParams.append("inputMint", inputMint)
    url.searchParams.append("outputMint", outputMint)
    url.searchParams.append("amount", amount)
    url.searchParams.append("userPublicKey", userPublicKey)

    const orderResponse = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-api-key": JUPITER_API_KEY || ""
      }
    })

    const responseText = await orderResponse.text()
    console.log("Status:", orderResponse.status)
    console.log("Response:", responseText)

    if (orderResponse.status === 200) {
      const orderData = JSON.parse(responseText)
      res.json(orderData)
    } else {
      res.status(orderResponse.status).json({ error: responseText })
    }
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed" })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
