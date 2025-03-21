import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

// Create a keypair from the wallet file
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

// Configure the uploader to use the Irys uploader service
umi.use(irysUploader({address: "https://devnet.irys.xyz/",}));
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        //2. Convert image to generic file.
        //3. Upload image

        // Load the image from the filesystem
        // const image = await readFile("./generug.png");
        const image = await readFile("../andre-rug.png");
        // const newFile = createGenericFile(image, "pinkRug.jpg", {
        //     contentType: "image/jpeg",
        // })

        // // Convert the image to a generic file format
        const newFile = createGenericFile(image, "andre-rug.jpg", {
            contentType: "image/jpeg",
        })

        // Upload the image and retrieve the URI
        const [myUri] = await umi.uploader.upload([newFile]);
        console.log("Your image URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

// Your image URI:  https://gateway.irys.xyz/AAXu91ufBEHNf7cW3foCP28JESR5UheW6JJ2BSjg33yt

// npx ts-node nft_image.ts 