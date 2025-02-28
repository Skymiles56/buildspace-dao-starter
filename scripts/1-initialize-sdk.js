import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import dotenv from "dotenv";

dotenv.config();

if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "" ) {
    console.log("Private key not found.");
}

if (!process.env.ALCHEMY_RPC_URL  || process.env.ALCHEMY_RPC_URL === ""){
    console.log("QuickNode API URL not found.");
}

if (!process.env.WALLET_ADDRESS  || process.env.WALLET_ADDRESS === ""){
    console.log(" Wallet Address not found.");
}

const sdk = ThirdwebSDK.fromPrivateKey(
process.env.PRIVATE_KEY,
 
process.env.ALCHEMY_RPC_URL
);

(async ()=> {
     try{
     const address = await sdk.getSigner().getAddress();
     console.log("SDK initialized by address:", address)
    } catch (err) { 
    console.error("Failed to get apps from the SDK", err);
    process.exit(1);
    }
    })();

    export default sdk;
