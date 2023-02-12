import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
     //This is the address of our erc-20 contract printed out in the step before
     const token = await sdk.getContract("0xD9B77480E16732ae1eC73EA4dBFCd0E29Cd6c5B3", "token");
     // what's the max supply you want to set? 10000 is a nice number!

     const amount = 1_000_000;
    // Interact with your deployed ERC-20 contract and mint the tokens!
    await token.mint(amount);
    const totalSupply = await token.totalSupply();
    
    //Print out how many of our token's are out there now!
    console.log("there nown is", totalSupply.displayValue, "$HOKAGE in circulation");
    } catch (error) {
        console.error("Failed to priont money" ,error);
    }
    })();