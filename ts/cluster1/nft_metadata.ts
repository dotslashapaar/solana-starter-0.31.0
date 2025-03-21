import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://gateway.irys.xyz/AAXu91ufBEHNf7cW3foCP28JESR5UheW6JJ2BSjg33yt"
    //     const metadata = {
    //         name: "PinkRug",
    //         symbol: "PNKRUG",
    //         description: "Get Rugged By Beautiful Pink RUGGGGGGG",
    //         image: image,
    //         attributes: [
    //             {trait_type: 'Rug-Type', value: 'Pixel-Persian'},
    //             {trait_type: 'ConstructionRug-Type', value: 'Pink-Knotted'},
    //             {trait_type: 'Materials', value: 'Pixel-Wool'},
    //             {trait_type: 'Style', value: 'Traditional'},
    //             {trait_type: 'Features', value: 'Geometric-Pixel-Patterns'}
    //         ],
    //         properties: {
    //             files: [
    //                 {
    //                     type: "image/png",
    //                     uri: image
    //                 },
    //             ]
    //         },
    //         creators: []
    //     };
    //     const myUri = await umi.uploader.uploadJson(metadata);
    //     console.log("Your metadata URI: ", myUri);
    // }
    const metadata = {
        name: "Andre-XD",
        symbol: "ANDREXD",
        description: "Beautiful Andre as Strawberry XD",
        image: image,
        attributes: [
            {trait_type: 'Person', value: 'Andre'},
            {trait_type: 'Fruit', value: 'Strawberry'}
        ],
        properties: {
            files: [
                {
                    type: "image/png",
                    uri: image
                },
            ]
        },
        creators: []
    };
    const myUri = await umi.uploader.uploadJson(metadata);
    console.log("Your metadata URI: ", myUri);
}
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

// Your metadata URI:  https://gateway.irys.xyz/6ibHHEFGZSXPLh9DwWH2JhrAkZMAKMoUweYAUu8Corab

// npx ts-node nft_metadata.ts 