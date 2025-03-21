import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("5nSvBShsKXaS6oJKjGasW3znihEnmJYc6tDfhoBYMYs6");

// Recipient address
const to = new PublicKey("BBWpMG3mXtGVMNVzGJSAVjkKqVixMXepWELv3fBL1RtU"); //Ayman's pubkey

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromAta = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        // Get the token account of the toWallet address, and if it does not exist, create it
        const toAta = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);
        console.log(toAta);
        // Transfer the new token to the "toTokenAccount" we just created
        const decimals = 6; 
        const amount = 5000000 * 10 ** decimals;

        // Transfer the tokens to the recipient's associated token account
        const tx = await transfer(connection, keypair, fromAta.address, toAta.address, keypair.publicKey, amount);
        console.log(`Transfer successful! Transaction ID: ${tx}`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();

// Transfer successful! Transaction ID: 55jEuJEnJX3SvuhY3QkEP3ZvpdqF3Ton3rLm68EhoYtmX98WRu2ceqyzRkRxDUjo74WDraK439wL3DNLPM3E7M1

// npx ts-node spl_transfer.ts 

