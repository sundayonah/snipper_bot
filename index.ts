import { ethers, JsonRpcProvider, Contract, Wallet } from 'ethers';
// import .env from 'dotenv';
require('dotenv').config();

// Uniswap V2 Factory ABI type definition
const UNISWAP_V2_FACTORY_ABI = [
    "event PairCreated(address indexed token0, address indexed token1, address pair, uint)"
];

const routerAbi = [{ "inputs": [{ "internalType": "address", "name": "_factory", "type": "address" }, { "internalType": "address", "name": "_WETH", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "WETH", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "amountADesired", "type": "uint256" }, { "internalType": "uint256", "name": "amountBDesired", "type": "uint256" }, { "internalType": "uint256", "name": "amountAMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountBMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "addLiquidity", "outputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amountTokenDesired", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "addLiquidityETH", "outputs": [{ "internalType": "uint256", "name": "amountToken", "type": "uint256" }, { "internalType": "uint256", "name": "amountETH", "type": "uint256" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "reserveIn", "type": "uint256" }, { "internalType": "uint256", "name": "reserveOut", "type": "uint256" }], "name": "getAmountIn", "outputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "reserveIn", "type": "uint256" }, { "internalType": "uint256", "name": "reserveOut", "type": "uint256" }], "name": "getAmountOut", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }], "name": "getAmountsIn", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }], "name": "getAmountsOut", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "reserveA", "type": "uint256" }, { "internalType": "uint256", "name": "reserveB", "type": "uint256" }], "name": "quote", "outputs": [{ "internalType": "uint256", "name": "amountB", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountAMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountBMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "removeLiquidity", "outputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "removeLiquidityETH", "outputs": [{ "internalType": "uint256", "name": "amountToken", "type": "uint256" }, { "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "removeLiquidityETHSupportingFeeOnTransferTokens", "outputs": [{ "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bool", "name": "approveMax", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "removeLiquidityETHWithPermit", "outputs": [{ "internalType": "uint256", "name": "amountToken", "type": "uint256" }, { "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bool", "name": "approveMax", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens", "outputs": [{ "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountAMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountBMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bool", "name": "approveMax", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "removeLiquidityWithPermit", "outputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapETHForExactTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactETHForTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactETHForTokensSupportingFeeOnTransferTokens", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForETH", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForETHSupportingFeeOnTransferTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "amountInMax", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapTokensForExactETH", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "amountInMax", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapTokensForExactTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }]

interface PairCreationEvent {
    token0: string;
    token1: string;
    pairAddress: string;
    blockNumber: number;
}

class UniswapFactoryListener {
    private provider: JsonRpcProvider;
    private factoryContract: Contract;
    private routerContract: string;
    private wallets: Wallet[];
    private targetToken: string;
    private lastProcessedBlock: number;
    private amountIn: string;
    private rpcLimitDelayMs: number = 1000;

    constructor(
        providerUrl: string,
        factoryAddress: string,
        routerAddress: string,
        targetToken: string,
        privateKeys: string[],
        amountIn: string,
        rpcLimitDelayMs: number,
        startBlock?: number
    ) {
        // Create JSON-RPC provider
        this.provider = new ethers.JsonRpcProvider(providerUrl);

        this.amountIn = amountIn;
        this.rpcLimitDelayMs = rpcLimitDelayMs;

        // Create wallets from private keys
        this.wallets = privateKeys.map(
            (key) => new ethers.Wallet(key, this.provider)
        );

        // Create contracts
        this.factoryContract = new ethers.Contract(
            factoryAddress,
            UNISWAP_V2_FACTORY_ABI,
            this.provider
        );
        this.routerContract = routerAddress;
        this.targetToken = targetToken.toLowerCase();
        this.lastProcessedBlock = startBlock || 0;
    }

    async startPolling(intervalMs: number = 10, maxRetries: number = 5, retryDelayMs: number = 10000): Promise<() => void> {
        try {
            console.log(`Starting polling from block ${this.lastProcessedBlock}`);

            const poll = async () => {
                console.log('Polling started');
                console.log(`Starting polling from block ${this.lastProcessedBlock}`);
                let retries = 0;
                while (retries < maxRetries) {
                    console.log('Polling attempt:', retries + 1);
                    try {
                        // Get the latest block number
                        console.log('Fetching latest block...');
                        const latestBlock = await this.provider.getBlockNumber();
                        console.log('Latest block:', latestBlock);

                        break; // Exit the retry loop if successful
                    } catch (error) {
                        retries++;
                        console.error(`Error in polling cycle (attempt ${retries}):`, error);
                        if (retries >= maxRetries) {
                            console.error('Max retries reached. Stopping polling.');
                            return;
                        }
                        await new Promise(resolve => setTimeout(resolve, retryDelayMs));
                    }
                }
            };

            // Initial poll
            await poll();

            // Set up interval polling
            const pollInterval = setInterval(poll, intervalMs);

            // Cleanup method
            return () => clearInterval(pollInterval);
        } catch (error) {
            console.error('Error starting polling:', error);
            throw error;
        }
    }

    private processingQueue: Promise<void> = Promise.resolve();


    private async processPairCreationSequentially(event: PairCreationEvent): Promise<void> {
        for (const wallet of this.wallets) {
            console.log(`Processing swap with wallet: ${wallet.address}`);
            try {
                const isToken0Target = event.token0.toLowerCase() === this.targetToken;
                const otherToken = isToken0Target ? event.token1 : event.token0;

                const amountIn = ethers.parseEther(this.amountIn);
                const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20-minute deadline
                console.log('Preparing swap...111111111');

                // Swap with the current wallet
                const routerContract = new ethers.Contract(
                    this.routerContract,
                    routerAbi,
                    wallet
                );
                const amountInEther = '0.002';
                const amountInWei = ethers.parseEther(this.amountIn);
                console.log('Preparing swap...222222222', amountInWei);
                console.log('Calling swapExactETHForTokens with parameters:', {
                    amountOutMin: 0,
                    path: [
                        "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", // WETH
                        "0xcFdB4F832e2c12894DCc5ae724846E0d32D7Bc61" // Target token`
                    ],
                    to: wallet.address,
                    deadline,
                    value: amountIn.toString()
                });

                const buyAddresses = ['0x7849E08974dE75bB27aaEc1B5928b0B29d2E87A0', '0xb827c3B5BDd0cC5dA8eD12d6ACdB5E4FCA1f5B8C']

                // Estimate gas limit
                const gasLimit = await routerContract.swapExactETHForTokens.estimateGas(
                    0,
                    [
                        "0x4200000000000000000000000000000000000006", // WETH
                        "0x1c2f7c22664AB936a791c9AeC25127fED1F1F941" // Target token`
                    ],
                    wallet.address,
                    deadline,
                    { value: amountIn }
                );
                console.log('Estimated gas limit:', gasLimit.toString());
                const tx = await routerContract.swapExactETHForTokens(
                    0,
                    [
                        "0x4200000000000000000000000000000000000006", // WETH
                        "0x1c2f7c22664AB936a791c9AeC25127fED1F1F941" // Target token`
                    ],
                    wallet.address,
                    deadline,
                    { value: amountInWei, gasLimit: gasLimit }
                );

                console.log(`Transaction sent by ${wallet.address}: ${tx.hash}`);
                const receipt = await tx.wait();
                console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
            } catch (error) {
                console.error(`Error with wallet ${wallet.address}:`, error);
            }

            // Enforce delay to comply with RPC limits
            await new Promise((resolve) => setTimeout(resolve, this.rpcLimitDelayMs));
        }
    }
}

// Example usage
async function main() {
    const PROVIDER_URL = 'https://base.drpc.org';//'https://base.llamarpc.com';//'https://base.drpc.org';
    const UNISWAP_V2_FACTORY = "0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6";//'0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6';
    const TARGET_TOKEN = '0x1c2f7c22664AB936a791c9AeC25127fED1F1F941';
    const RPC_LIMIT_DELAY = 1000;

    const UNISWAP_V2_ROUTER = "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24"; // Sepolia Router 0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3
    const PRIVATE_KEY = ['a1920188dc0e247499f30b436e8897722e1fff873799d2ded75dd2db99f4d926', '448f0941081d8801e82233ced68469dbf13e8ffa5f6b291622362987ef5d3467', 'b05a04f1de376fc7380f70ee04143e547817a0ec5fdf3abd7bb8e4db4ca1df37', '7ea797a44081e23f80adda212f14b02c4e2bf81c54cff073e8bee472f9f7fcbb', 'a71e7ceef7908ca836e54bd97c6e5d30335cc6939b3f39f4b2a09b5df7dafdc0']; // Replace with your actual private key
    const amountIn = '0.002'; // Amount of ETH to swap


    const listener = new UniswapFactoryListener(
        PROVIDER_URL,
        UNISWAP_V2_FACTORY,
        UNISWAP_V2_ROUTER,
        TARGET_TOKEN,
        PRIVATE_KEY,
        amountIn, // Amount of ETH to swap
        RPC_LIMIT_DELAY
    );

    // Start polling
    const stopPolling = await listener.startPolling();

    // Optional: Handle process termination
    process.on('SIGINT', async () => {
        console.log('Stopping listener...');
        stopPolling();
        process.exit();
    });
}


// Uncomment to run
main().catch(console.error);