// this will fetch solana balance 
// and show it on a check balance 
// and handle errors

import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js"
import { useEffect, useState } from "react"
import { PublicKey } from "@solana/web3.js"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"

export function useSolanaBalance(publicKey: string) {
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSolanaBalance = async () => {

      try {
        setLoading(true)
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

        // only for solana, dont know if i should just try to fetch all of the required tokens from "getTokenAccountsByOwner",
        // i know that solana native and usdc isnt, but dont know if this is a good practice or not

        const publicKeyObj = new PublicKey(publicKey)
        const balanceInLamports = await connection.getBalance(publicKeyObj)

        const balanceInSolana = balanceInLamports / LAMPORTS_PER_SOL
        setBalance(balanceInSolana)

        // for USDC

        /*"jsonrpc": "2.0",
        "result": {
          "context": { "apiVersion": "3.1.8", "slot": 341197933 },
          "value": [
            {
              "pubkey": "BGocb4GEpbTFm8UFV2VsDSaBXHELPfAXrvd4vtt8QWrA",
              "account": {
                "data": {
                  "program": "spl-token",
                  "parsed": {
                    "info": {
                      "isNative": false,
                      "mint": "2cHr7QS3xfuSV8wdxo3ztuF4xbiarF6Nrgx3qpx3HzXR",
                      "owner": "A1TMhSGzQxMr1TboBKtgixKz1sS6REASMxPo1qsyTSJd",
                      "state": "initialized",
                      "tokenAmount": {
                        "amount": "420000000000000",
                        "decimals": 6,
                        "uiAmount": 420000000.0,
                        "uiAmountString": "420000000"
                      }
                    },
                    "type": "account"
                  },
                  "space": 165
                },
                "executable": false,
                "lamports": 2039280,
                "owner": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                "rentEpoch": 18446744073709551615,
                "space": 165
              }
            }
          ]
        },
        "id": 1
      }*/

        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKeyObj, { programId: TOKEN_PROGRAM_ID })
        const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        const usdcAccount = tokenAccounts.value.find((account) => account.account.data.parsed.info.mint === USDC_MINT
          && account.account.data.parsed.info.tokenAmount.uiAmount !== 0)

        const usdc = usdcAccount?.account.data.parsed.info.tokenAmount.uiAmount

        setLoading(false)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
          setLoading(false)
        } else {
          setError("unknown error")
        }
      }
    }
    fetchSolanaBalance()
  }, [publicKey])
  return { balance, loading, error }
}
