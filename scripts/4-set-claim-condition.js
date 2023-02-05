import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";
(async  () => {
 try{
    const editionDrop = await sdk.getContract("0xEdDc07f49E6f506908956ea5a43e614Ffa211DC5" , "edition-drop");
// we define our claim conditions, this is an array of objects because 
// we can have multiple phases starting at different times if we to
const claimConditions= [{
    // when people are gonna be able to start claimming the nfts (now)
    startTime: new Date(),
    // THe maximum number of NFTs that can be claimed
    maxClaimable: 50_000,
    // the price of our NFT (free)
    price: 0,
    // The amount of NFT people can claim in one transaction 
    maxClaimablePerWallet: 1,
    // we set the wait between transactions to unlimited, which means 
    // people are only allowed to claim once
    waitInSeconds: MaxUint256,
  }]
  await editionDrop.claimConditions.set("0", claimConditions);
  console.log("sucessfully set claim condition!");
} catch (error) {
    console.error("failed to set claim condition", error);
    }
})();
