require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.19",
    paths: {
        sources: "./contracts",
        artifacts: "./artifacts"
    },
    networks: {
        // Ethereum Mainnet
        mainnet: {
            url: process.env.MAINNET_RPC_URL || "https://eth.llamarpc.com",
            accounts: process.env.DEPLOYER_PRIVATE_KEY
                ? [process.env.DEPLOYER_PRIVATE_KEY]
                : [],
            chainId: 1
        },
        // Sepolia Testnet (untuk testing)
        sepolia: {
            url: process.env.SEPOLIA_RPC_URL || "https://rpc.ankr.com/eth_sepolia",
            accounts: process.env.DEPLOYER_PRIVATE_KEY
                ? [process.env.DEPLOYER_PRIVATE_KEY]
                : [],
            chainId: 11155111,
            timeout: 120000 // 2 minute timeout
        }
    }
};
