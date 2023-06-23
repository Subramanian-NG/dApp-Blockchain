import "./App.css";
import { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import DisputeClaim from "./DisputeClaim";
import InitiateShipment from "./InitiateShipment";
import PackageInformation from "./PackageInformation";
import Register from "./Register";
import Transport from "./Transport";
import PackageDetailsComponent from "./PackageDetails";
import PostDeliveryComponent from "./PostDelivery";
import ShipmentProgressComponent from "./ShipmentProgress";
import ContractArtifact from "./ShipmentContract.json";

function App() {
  const [msg, setMsg] = useState("");

  const checkWallet = async () => {
    //check if MetaMask is installed in the browser
    if (window.ethereum) {
      setMsg("Wallet Found");
    } else {
      setMsg("Please Install MetaMask");
    }
  };

  const readSmartContract = async () => {
    if (window.ethereum) { 
      const account = await window.ethereum.request({
       method: "eth_requestAccounts",
      });
      const contractABI = ContractArtifact.abi;
      const contractAddress = ContractArtifact.networks[5777].address; 
      const web3 = new Web3(Web3.givenProvider);
      const shipmentContract = new web3.eth.Contract(contractABI, contractAddress);
      console.log('main page connected to metamask with account--',account[0]);
    } else {
    //If  no Wallet
      alert("Get MetaMask to connect");
    }
  };

  useEffect(() => {
    checkWallet();
    readSmartContract();
  }, []);

  return (
    <div className="App">
      <h1>Shipment Smart Contract</h1>
      <BrowserRouter>
        <nav>
          <ul style={{ listStyleType: "none" }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register Parties</Link>
            </li>
            <li>
              <Link to="/iniateShipment">
                Initiate Shipment process
              </Link>
            </li>
            <li>
              <Link to="/updatePackage">
                Update Package Information
              </Link>
            </li>
            <li>
              <Link to="/updateTransport">
                Update Transport Information
              </Link>
            </li>
            <li>
              <Link to="/postDelivery">Process Post Delivery</Link>
            </li>
            <li>
              <Link to="/initiateDispute">
                Initiate Dispute Claim
              </Link>
            </li>
            <li>
              <Link to="/getPackage">Get Package Details</Link>
            </li>
            <li>
              <Link to="/shipmentProgress">Get Shipment Progress</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" component={App} />
          <Route path="/register" element={<Register />} />
          <Route path="/iniateShipment" element={<InitiateShipment />} />
          <Route path="/updatePackage" element={<PackageInformation />} />
          <Route path="/updateTransport" element={<Transport />} />
          <Route path="/postDelivery" element={<PostDeliveryComponent />}/>
          <Route path="/initiateDispute" element={<DisputeClaim />} />
          <Route path="/getPackage" element={<PackageDetailsComponent />} />
          <Route path="/shipmentProgress" element={<ShipmentProgressComponent />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
