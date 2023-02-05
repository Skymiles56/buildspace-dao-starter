import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
    try {
     const editionDropAddress = await sdk.deployer.deployEditionDrop({
        // The collection's name, ex. CryptoPunks
        name: "NarutoDAO Membership",
        // a description for the collection
        description: "A DAO for fans of Naruto.",
        // the image that will be held on our NFT! the fun part :)
        image: readFileSync("scripts/assets/naruto.png"),
        // we need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the contract
        // we're planning on not charging people for the drop, so we'll pass in the 0x0 address
        // you can set this to your own wallet address if you want to charge for the drop
        primary_sale_recipient: AddressZero,
     });
      // this initializtion returns the address of our contract 
      // we use this to initalize the contract on the thirdweb sdk
      const  editionDrop = await sdk.getContract(editionDropAddress, "edition-drop");
      
      // with this, we can get the metadata of our contract
      const metadata = await editionDrop.metadata.get();

      console.log(
        "successfully deployed editionDrop contract, address:",
        editionDropAddress,
      );
      console.log("editionDrop metadata:", metadata);
    } catch (error) {
        console.log("failed to deploy editionDrop contract", error);
    }
    })();   

    