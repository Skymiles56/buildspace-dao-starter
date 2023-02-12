import { useAddress, ConnectWallet, useContract, useNFTBalance, Web3Button } from '@thirdweb-dev/react';
import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import './index.js';
import './index.css';
import { fetchRawPredeployMetadata } from '@thirdweb-dev/sdk';
const App = () => {
  // Use the hooks thirdweb give us.
  const address = useAddress();
  console.log("👋 Address:", address);
  
  const editionDropAddress = "0xE96CC02B1149aac31C19988D5c4E4EB15445515A";
  const { contract: editionDrop } = useContract(editionDropAddress, "edition-drop");
  // Hook to check if the user has our NFT
  
  const {  contract: token } = useContract(' 0xD9B77480E16732ae1eC73EA4dBFCd0E29Cd6c5B3' , 'token');
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0")
 
  
 const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0)
  }, [nftBalance])
  
  // holds the amount of token each member has in state. 
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  //the array holding all of our members addresses.
  const [memberAddresses, setMemberAddresses] = useState([]);

  // s fancy function to shorten someones wallet address. no need to show the whole thing.
  const shortenAddress = (str) => {
    return str.substring(0, 6) + '...' + str.substring(str.length - 4);
   };

   // This useEffect grabs all the addresses of our members holding our NFT.
   useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // just like we did in the 7-airdrop-tokens.js file! grab the users who hold our NFT
    // with tokenId 0.
    const getAllAddresses = async () => {
      try {
        const memberAddresses = await editionDrop?.history.getAllClaimerAddreses(
          0,
        );
        setMemberAddresses(memberAddresses);
        console.log(' Members addresses' , memberAddresses);
      } catch (error) {
        console.error('failed to get member list' , error);
      }
    };
    getAllAddresses();
  }, [hasClaimedNFT, editionDrop?.history]);

  // this useeffect grabs the # of token each member holds
  useEffect(() => {
    if(!hasClaimedNFT) {
      return;
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token?.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts);
        console.log('amounts', amounts);
      } catch (error) {
        console.error('failed to get members balances' , error);
      }
      };
      getAllBalances();
    }, [hasClaimedNFT, token?.history]);
  

  
  //now, we combine the memberAddresses and memberTokenAmount into a single array
   const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
   // we're checking if we are finding the address in the mmemberTokenAmounts array
   // if we are we'll return the amount of token the user has.
   // otherwise,  return 0
   const member = memberTokenAmounts?.find(({ holder }) => holder === address);
   
   return {
    address, 
    tokenAmount: member?.balance.displayValue || '0'
    };
  });
  }, [memberAddresses, memberTokenAmounts]);
  
  
  
  // This is the case where the user hasn't connected their wallet
   // to your web app. Let them call connectWallet.
   if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to NarutoDAO</h1>
        <div className="btn-hero">
          <ConnectWallet />
        </div>
      </div>
    );
   }
   
   if (hasClaimedNFT)  {
    return ( 
      <div className="member-page">
        <h1> DAO Member Page </h1>
        <p>Congratulations on being a member</p>
        <div>
         <div>
          <h2> Member List</h2>
           <table className="card">
           <thead>
            <tr>
               <th>Address</th>
               <th>Token Amount</th>
               </tr>
               </thead>
               <tbody>
                {memberList.map((member) => {
                return (
                  <tr key={member.address}>
                    <td>{shortenAddress(member.address)}</td>
                     <td>{member.tokenAmount}</td>
                     </tr>
                     );
                    })}
              </tbody>
            </table>
           </div>
          </div>
        </div>
    );
  }
                  

    
  // This is the case where we have the user's address
  // which means they've connected their wallet to our site!
  return (
   <div className="mint-nft">
    <h1>Mint your free Dao Membership NTF</h1>
    <div className="btn-hero">
      <Web3Button
      contractAddress={editionDropAddress}
      action={contract => {
        contract.erc1155.claim(0, 1)
      }} 
      onSuccess={() => {
      console.log(`Successfully Minted! check if out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
      }}
      onError={error => {
        console.error("Failed to mint NFT",error);
      }}
    >
    Mint your NFT (FREE)
    </Web3Button>
    </div>
    </div>
   );
  }
     export default App;
  