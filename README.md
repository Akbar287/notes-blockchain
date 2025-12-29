# 📝 Notes Blockchain

A decentralized notes application built on Ethereum Sepolia testnet. Store your notes securely on the blockchain - transparent, immutable, and censorship-resistant.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-627EEA?logo=ethereum&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-0.8.28-363636?logo=solidity&logoColor=white)

## ✨ Features

- 🔐 **Wallet Authentication** - Connect with MetaMask, WalletConnect, Coinbase Wallet
- 📝 **CRUD Operations** - Create, Read, Update, Delete notes on blockchain
- 🌗 **Dark/Light Mode** - Toggle theme with persistent preference
- 🎨 **Modern UI** - Framer Motion animations, Aero Glass effects
- 📱 **Responsive** - Works on desktop and mobile
- 🔗 **Decentralized** - Data stored on Ethereum Sepolia testnet

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 18, TypeScript |
| Styling | TailwindCSS, Framer Motion |
| Web3 | wagmi, viem, @rainbow-me/rainbowkit |
| Smart Contract | Solidity, Hardhat |
| Network | Ethereum Sepolia Testnet |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm
- MetaMask wallet
- Sepolia testnet ETH ([Get from faucet](https://sepoliafaucet.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akbar287/notes-blockchain.git
   cd notes-blockchain
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your:
   - `PRIVATE_KEY` - Wallet private key for deployment
   - `SEPOLIA_RPC_URL` - Sepolia RPC endpoint

4. **Run development server**
   ```bash
   yarn start
   # or
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📜 Smart Contract

### Deploy Contract

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Contract Address (Sepolia)
```
0xYourContractAddressHere
```

Update the address in `src/contracts/notesContract.ts` after deployment.

## 📁 Project Structure

```
notes-blockchain/
├── contracts/           # Solidity smart contracts
│   └── NotesContract.sol
├── scripts/             # Deployment scripts
│   └── deploy.js
├── src/
│   ├── components/      # React components
│   │   ├── cms/         # CMS components (Navbar, Footer, etc.)
│   │   └── ui/          # UI components (Button, Dialog, etc.)
│   ├── config/          # wagmi configuration
│   ├── context/         # React context (Theme)
│   ├── contracts/       # Contract ABI & addresses
│   ├── hooks/           # Custom hooks (useNotesContract)
│   ├── pages/           # Page components
│   ├── router/          # React Router configuration
│   └── middleware/      # Authentication middleware
├── hardhat.config.js    # Hardhat configuration
└── tailwind.config.js   # TailwindCSS configuration
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Run development server |
| `yarn build` | Build for production |
| `yarn test` | Run tests |
| `npx hardhat compile` | Compile smart contracts |
| `npx hardhat run scripts/deploy.js --network sepolia` | Deploy to Sepolia |

## 🌐 Live Demo

Visit: [https://notes-blockchain.vercel.app](https://notes-blockchain.vercel.app) *(if deployed)*

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 👤 Author

**Muhammad Akbar**

- GitHub: [@Akbar287](https://github.com/Akbar287)
- Twitter: [@Akbar287_](https://twitter.com/Akbar287_)
- LinkedIn: [Muhammad Akbar](https://www.linkedin.com/in/muhammad-akbar-596803201/)

---

Made with ❤️ and Blockchain
