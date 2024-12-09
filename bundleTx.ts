import { ethers, JsonRpcProvider, Contract, Wallet } from 'ethers';
require('dotenv').config();
import tokenAbi from "./ERC20ABI.json"


const routerAbi = [{ "inputs": [{ "internalType": "address", "name": "_factory", "type": "address" }, { "internalType": "address", "name": "_WETH", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "WETH", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "amountADesired", "type": "uint256" }, { "internalType": "uint256", "name": "amountBDesired", "type": "uint256" }, { "internalType": "uint256", "name": "amountAMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountBMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "addLiquidity", "outputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amountTokenDesired", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "addLiquidityETH", "outputs": [{ "internalType": "uint256", "name": "amountToken", "type": "uint256" }, { "internalType": "uint256", "name": "amountETH", "type": "uint256" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "reserveIn", "type": "uint256" }, { "internalType": "uint256", "name": "reserveOut", "type": "uint256" }], "name": "getAmountIn", "outputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "reserveIn", "type": "uint256" }, { "internalType": "uint256", "name": "reserveOut", "type": "uint256" }], "name": "getAmountOut", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }], "name": "getAmountsIn", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }], "name": "getAmountsOut", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "reserveA", "type": "uint256" }, { "internalType": "uint256", "name": "reserveB", "type": "uint256" }], "name": "quote", "outputs": [{ "internalType": "uint256", "name": "amountB", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountAMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountBMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "removeLiquidity", "outputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "removeLiquidityETH", "outputs": [{ "internalType": "uint256", "name": "amountToken", "type": "uint256" }, { "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "removeLiquidityETHSupportingFeeOnTransferTokens", "outputs": [{ "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bool", "name": "approveMax", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "removeLiquidityETHWithPermit", "outputs": [{ "internalType": "uint256", "name": "amountToken", "type": "uint256" }, { "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bool", "name": "approveMax", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens", "outputs": [{ "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountAMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountBMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bool", "name": "approveMax", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "removeLiquidityWithPermit", "outputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapETHForExactTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactETHForTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactETHForTokensSupportingFeeOnTransferTokens", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForETH", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForETHSupportingFeeOnTransferTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "amountInMax", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapTokensForExactETH", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "amountInMax", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapTokensForExactTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }]


class TokenBuyer {
    private provider: JsonRpcProvider;
    private routerAddress: string;
    private targetToken: string;
    private wallets: Wallet[];
    private amountIn: string;
    private buyIntervalMs: number;
    private rpcLimitDelayMs: number;
    private sellDelayMs: number;

    constructor(
        providerUrl: string,
        routerAddress: string,
        targetToken: string,
        privateKeys: string[],
        amountIn: string,
        buyIntervalMs: number,
        rpcLimitDelayMs: number = 10000,
        sellDelayMs: number = 60000 // 10 sec // // 4 minutes default
    ) {
        // Create JSON-RPC provider
        this.provider = new ethers.JsonRpcProvider(providerUrl);

        // Create wallets from private keys
        this.wallets = privateKeys.map(
            (key) => new ethers.Wallet(key, this.provider)
        );

        this.routerAddress = routerAddress;
        this.targetToken = targetToken;
        this.amountIn = amountIn;
        this.buyIntervalMs = buyIntervalMs;
        this.rpcLimitDelayMs = rpcLimitDelayMs;
        this.sellDelayMs = sellDelayMs;
    }

    async startBuying(): Promise<() => void> {
        // console.log('Starting periodic token buying...');
        console.log('Starting periodic token selling...');

        const buyTokens = async () => {
            try {
                for (const wallet of this.wallets) {
                    const boughtAmount = await this.buyTokenForWallet(wallet);
                    console.log(`Processing wallet: ${wallet.address}`);

                    console.log("Bougth :", boughtAmount)

                    // Schedule selling after specified delay
                    if (boughtAmount) {
                        console.log(" selling token")
                        setTimeout(async () => {
                            await this.sellTokenForWallet(wallet, this.amountIn);
                        }, this.sellDelayMs);
                    }

                    // Enforce delay between wallet transactions
                    await new Promise((resolve) => setTimeout(resolve, this.rpcLimitDelayMs));
                }
            } catch (error) {
                console.error('Error in buying cycle:', error);
            }
        };

        // Initial immediate buy
        await buyTokens();

        // Set up periodic buying
        const buyInterval = setInterval(buyTokens, this.buyIntervalMs);

        // Cleanup method
        return () => clearInterval(buyInterval);
    }

    private async buyTokenForWallet(wallet: Wallet): Promise<string | null> {
        try {
            console.log(`Attempting to buy tokens with wallet: ${wallet.address}`);

            // Convert amount to wei
            const amountInWei = ethers.parseEther(this.amountIn);

            // Create router contract instance
            const routerContract = new ethers.Contract(
                this.routerAddress,
                routerAbi,
                wallet
            );

            // Prepare transaction parameters
            const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20-minute deadline
            const WETH = await routerContract.WETH();

            const path = [WETH.toString(), this.targetToken];

            // Estimate gas limit
            const gasLimit = await routerContract.swapExactETHForTokens.estimateGas(
                0, // Minimum amount out (slippage protection)
                path,
                wallet.address,
                deadline,
                { value: amountInWei }
            );

            // Send swap transaction
            const tx = await routerContract.swapExactETHForTokens(
                0, // Minimum amount out (slippage protection)
                path,
                wallet.address,
                deadline,
                {
                    value: amountInWei,
                    gasLimit: gasLimit
                }
            );

            console.log(`Buy transaction sent by ${wallet.address}: ${tx.hash}`);

            // Wait for transaction confirmation
            const receipt = await tx.wait();
            console.log(`Buy transaction confirmed in block: ${receipt.blockNumber}`);

            // Return the amount of tokens bought (optional: you might want to retrieve this precisely)
            return this.amountIn;

        } catch (error) {
            console.error(`Error buying tokens with wallet ${wallet.address}:`, error);
            return null;
        }
    }


    private async sellTokenForWallet(wallet: Wallet, amountIn: string): Promise<void> {
        try {
            console.log(`Attempting to sell tokens for wallet: ${wallet.address}`);

            const routerContract = new ethers.Contract(this.routerAddress, routerAbi, wallet);
            const tokenContract = new ethers.Contract(this.targetToken, tokenAbi, wallet);

            const balance = await tokenContract.balanceOf(wallet.address);
            console.log(balance.toString(), "balance:");
            if (balance === BigInt(0)) {
                console.log("Balance is zero, skipping...");
                return;
            }

            const formattedBalance = balance.toString();
            console.log(`Current token balance: ${formattedBalance}`);

            const currentAllowance = await tokenContract.allowance(wallet.address, this.routerAddress);
            console.log(`Current router allowance: ${ethers.formatUnits(currentAllowance, 18)}`);

            const WETH = await routerContract.WETH();
            const path = [this.targetToken, WETH.toString()];
            const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

            console.log('Swap Parameters:', { formattedBalance, path, deadline });

            // Approve tokens if needed
            if (BigInt(currentAllowance) < BigInt(balance)) {
                const approveTx = await tokenContract.approve(this.routerAddress, balance.toString());
                console.log(`Approval transaction sent: ${approveTx.hash}`);
                await approveTx.wait();
            }

            console.log("Tokens approved.");

            let gasLimit;
            try {
                gasLimit = await routerContract.swapExactTokensForETH.estimateGas(
                    formattedBalance,
                    0,
                    path,
                    wallet.address,
                    deadline
                );
            } catch (gasError) {
                console.error('Error estimating gas:', gasError);
                return;
            }

            console.log(`Estimated gas limit: ${gasLimit.toString()}`);

            const tx = await routerContract.swapExactTokensForETH(
                formattedBalance,
                0,
                path,
                wallet.address,
                deadline,
                { gasLimit }
            );
            console.log(`Sell transaction sent by address: ${wallet.address}| hash : ${tx.hash}`);
            const receipt = await tx.wait();
            console.log(`Sell transaction confirmed in block: ${receipt.blockNumber}`);
        } catch (error) {
            console.error(`Error selling tokens for wallet ${wallet.address}:`, error);
        }
    }


}

// Example usage remains the same as previous implementation
async function main() {
    const PROVIDER_URL = 'https://base.llamarpc.com' //'https://base.drpc.org';//'https://base.llamarpc.com';//'https://base.drpc.org';
    const UNISWAP_V2_ROUTER = "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24";
    const TARGET_TOKEN = '0x756355B72407E28Fa62D260a456c0a3A78f9C105';

    // Private keys array
    const PRIVATE_KEYS = [''];

    // Amount of ETH to swap per transaction
    const AMOUNT_IN = '0.00002';

    const BUY_INTERVAL_MS = 3600000; // 1 hour between buy cycles
    const RPC_LIMIT_DELAY = 100; // Delay between wallet transactions
    const SELL_DELAY_MS = 60000; // 4 minutes after buy

    // Create TokenBuyer instance
    const tokenBuyer = new TokenBuyer(
        PROVIDER_URL,
        UNISWAP_V2_ROUTER,
        TARGET_TOKEN,
        PRIVATE_KEYS,
        AMOUNT_IN,
        BUY_INTERVAL_MS,
        RPC_LIMIT_DELAY,
        SELL_DELAY_MS
    );

    // Start buying
    const stopBuying = await tokenBuyer.startBuying();

    // Optional: Handle process termination
    process.on('SIGINT', async () => {
        console.log('Stopping token buyer...');
        stopBuying();
        process.exit();
    });
}

main().catch(console.error);