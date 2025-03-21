import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wba-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    // let tx = await createNft(umi, {
    //     mint,
    //     name: "PinkRuggg",
    //     symbol: "PNKRUG",
    //     uri: "https://devnet.irys.xyz/BRVUWLDmARkFvUboAWDsYdaPrssgpR3Jv9Xsbco28zcK",
    //     sellerFeeBasisPoints: percentAmount(0.5),

    // })
    let tx = await createNft(umi, {
        mint,
        name: "Andre-XD",
        symbol: "ANDREXD",
        uri: "https://gateway.irys.xyz/6ibHHEFGZSXPLh9DwWH2JhrAkZMAKMoUweYAUu8Corab",
        sellerFeeBasisPoints: percentAmount(0.1),

    })
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("Mint Address: ", mint.publicKey);
})();

// https://explorer.solana.com/tx/tBsP9TSJU27WxDp7vN24krrhptCJRWCtJ2gA5akxeLjSH4T5F96fp9shSYiXKbhX7N4ZNoaFA2CHXxq1hdEgC1M?cluster=devnet
// Mint Address:  HDPhijWB2J7wE5b5BXiZAAmnJLYJiEpfRHZgwUMR3JL6

// npx ts-node nft_mint.ts