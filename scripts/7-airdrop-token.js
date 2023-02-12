import sdk from "./1-initialize-sdk.js"

(async () => {
    try {
        //this is the address to our ERC-1155 membership NFT contract.
        const editionDrop = await sdk.getContract ("0xE96CC02B1149aac31C19988D5c4E4EB15445515A", "edition-drop");
        //this is the address to our ERC-20 token contract.
        const token = await sdk.getContract("0xD9B77480E16732ae1eC73EA4dBFCd0E29Cd6c5B3", "token");
        // grab all the addresses of people who own our membership NFT, which has 
       // a tokenid of 0
       const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

       if (walletAddresses.length === 0) {
        console.log(
            "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
        );
        process.exit(0);
       }
       // loop through the array of addresses
       const airdropTargets = walletAddresses.map((address) => {
        //pick a random # between 1000 and 10000.
        const randomAmount = Math.floor(Math.random() *  (10000 - 1000 + 1) + 1000);
        console.log("going to airdrop", randomAmount, "tokens to", address);
       
        // set upn the target.
        const airdropTarget = {
            toAddress: address,
            amount: randomAmount,
        };
        return airdropTarget;
    });
    // call transferBatch on all our airdrop targets.
    console.log("Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log("Successfully airdropped tokens to all the holders of the NFT!");
    } catch (err) {
        console.error("Failed to airdrop tokens", err); 
        }
     })();