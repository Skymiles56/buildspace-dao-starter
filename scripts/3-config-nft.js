import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
    try {
        const editionDrop = await sdk.getContract("0xEdDc07f49E6f506908956ea5a43e614Ffa211DC5" , "edition-drop");
        await editionDrop.createBatch([
        {
        name: "Leaf Village Headband",
        description: "This NFT will give you access to NarutoDAO!",
        image: readFileSync("scripts/assets/headband.png"),
        },
        ]);
        console.log("Successfully created a  new NFT in the drop!");
        } catch (error) {
            console.error("failed to create the new NFT", error);
        }
    })();
