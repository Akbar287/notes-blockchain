const hre = require("hardhat");

async function main() {
    console.log("🚀 Deploying NotesContract to", hre.network.name, "...");
    console.log("");

    // Get deployer info
    const [deployer] = await hre.ethers.getSigners();
    console.log("📍 Deploying with account:", deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("💰 Account balance:", hre.ethers.formatEther(balance), "MATIC");
    console.log("");

    // Deploy contract
    console.log("⏳ Deploying contract...");
    const NotesContract = await hre.ethers.getContractFactory("NotesContract");
    const contract = await NotesContract.deploy();

    await contract.waitForDeployment();
    const address = await contract.getAddress();

    console.log("");
    console.log("═══════════════════════════════════════════════════════════");
    console.log("✅ NotesContract deployed successfully!");
    console.log("═══════════════════════════════════════════════════════════");
    console.log("");
    console.log("📄 Contract address:", address);
    console.log("🔗 Network:", hre.network.name);
    console.log("");
    console.log("📝 Next step:");
    console.log("   Update src/contracts/notesContract.ts with this address:");
    console.log("");
    console.log(`   export const NOTES_CONTRACT_ADDRESS = '${address}' as const;`);
    console.log("");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed!");
        console.error(error);
        process.exit(1);
    });
