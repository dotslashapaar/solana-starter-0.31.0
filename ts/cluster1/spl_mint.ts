import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo, getAccount } from '@solana/spl-token';
import wallet from "../wba-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com/", commitment);

const tokenDecimals = 6; // adjust this value according to your token's decimals
const mint = new PublicKey("5nSvBShsKXaS6oJKjGasW3znihEnmJYc6tDfhoBYMYs6");

(async () => {
    try {
        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );
        console.log(`ATA created/ retrieved: ${ata.address.toBase58()}`);

        const ataBalance = await getAccount(connection, ata.address);
        console.log(`ATA balance: ${ataBalance.amount}`);

        const mintTx = await mintTo(
            connection,
            keypair,           // payer
            mint,              // mint address
            ata.address,       // destination
            keypair,           // mint authority
            10000000 * 10 ** tokenDecimals // amount, considering token decimals
        );
        console.log(`Mint transaction ID: ${mintTx}`);

        console.log(`Ata Balance: ${ataBalance.amount}`);
    } catch (error) {
        console.error(`Error occurred: ${error}`);
    }
})(); 

// ATA created/ retrieved: 4bAEycUs8fwNfZi3pe2WmSrnK81JC8gEDFLkiCb5fhWX
// Mint transaction ID: 46MmsNV7h2ChhNnxF2sQw89i9BrtTB5gWeKTjs3HN8AKEE1GqX3LfH8ScKrbvcBYi9aYujZ9tKmdvNBMeZvpei9M

// npx ts-node spl_mint.ts 