import { useAddress, ConnectWallet } from '@thirdweb-dev/react';

const App = () => {
  const address = useAddress(); 
  console.log("Address:", address);
  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.

  if (!address) {
    return (
      <div classname="landing">
        <h1>Welcome to NarutoDAO</hi>
        <div className="btn-hero">
          <ConnectWallet />
          </div>
          </div>
         );
        }
          // This is the case where we have the user's address
  // which means they've connected their wallet to our site!
  
  return (
    <div className="landing">
      <h1> wallet connected, now what!</h1>
      </div>);
}

  

export default App;
