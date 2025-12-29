import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask, coinbaseWallet, injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
    chains: [sepolia, mainnet],
    // Reduce polling to minimize RPC requests
    pollingInterval: 30_000, // 30 seconds instead of default 4 seconds
    connectors: [
        metaMask({
            dappMetadata: {
                name: "Catatan by Blockchain",
            },
            preferDesktop: true,
        }),
        coinbaseWallet({
            appName: "Catatan by Blockchain",
            preference: { options: "all" },
        }),
        injected({ shimDisconnect: true }),
    ],
    transports: {
        [sepolia.id]: http(undefined, {
            batch: { batchSize: 100 },
        }),
        [mainnet.id]: http(),
    },
});
