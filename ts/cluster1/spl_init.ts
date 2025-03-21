import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a Solana devnet connection with a commitment level of "confirmed"
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        // Start the mint creation process
        const mint = await createMint(connection,keypair,keypair.publicKey,null, 6);
        console.log(`Mint address ${mint}`)
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()


// Mint address 5nSvBShsKXaS6oJKjGasW3znihEnmJYc6tDfhoBYMYs6

// npx ts-node spl_init.ts 