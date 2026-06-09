# Lumen — Solana Web Wallet

A web-based Solana wallet built with React, TypeScript, and Vite. Generate wallets from a seed phrase, track SOL and USDC balances, and send transactions on Devnet.

## Features

- **Seed Phrase Generation** — Create or import 12-word BIP39 mnemonics
- **Multi-Wallet Derivation** — Generate multiple wallets from a single seed
- **Balance Tracking** — View SOL and USDC balances in real-time
- **Send SOL** — Transfer SOL between wallets on Devnet
- **State Persistence** — Wallets and seed phrases saved locally
- **Professional UI** — Dark theme with Tailwind CSS

## Tech Stack

- **Frontend:** Vite + React + TypeScript
- **Blockchain:** @solana/web3.js, @solana/spl-token
- **State:** Zustand with localStorage persistence
- **Crypto:** bip39, tweetnacl, ed25519-hd-key
- **UI:** Tailwind CSS, Framer Motion, Lucide Icons

## Getting Started

### Prerequisites
- Node.js 18+ or Bun runtime

### Installation

```bash
git clone https://github.com/ParthAggarwal16/lumen
cd lumen
bun install
```

### Development

```bash
bun run dev
```

Open http://localhost:5173

### Build

```bash
bun run build
```

## Usage

1. **Create Wallet** — Generate a new 12-word seed phrase
2. **View Seed** — Reveal your seed phrase (save it safely!)
3. **Add Wallets** — Derive additional wallets from the same seed
4. **Check Balance** — View SOL and USDC holdings
5. **Send SOL** — Transfer SOL to another address

## Network

Currently deployed on **Devnet**. Get test SOL from [Solana Devnet Faucet](https://faucet.solana.com/)

## Deployment

Live at: [wallet-kosh.vercel.app](https://wallet-kosh.vercel.app/)

## Security

⚠️ **Warning:** This is a dev wallet. Never use with mainnet funds or real money.

- Private keys are stored in browser localStorage
- Do not share your seed phrase
- Only use on trusted devices

## Future Features

- Mainnet support
- Token swaps (Jupiter integration)
- Mobile app
- Hardware wallet support

## Author

Built by [Parth](https://github.com/ParthAggarwal16)

## License

MIT
