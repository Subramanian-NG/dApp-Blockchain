import { useState, useEffect } from "react";
import Web3 from "web3";
import ContractArtifact from "./ShipmentContract.json";

function MyForm() {
  const [scheduledDelivery, setScheduledDelivery] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
           });
           const contractABI = ContractArtifact.abi;
           const contractAddress = ContractArtifact.networks[5777].address; 
           const web3 = new Web3(Web3.givenProvider);
           const shipmentContract = new web3.eth.Contract(contractABI, contractAddress);
      shipmentContract.methods
        .initiateShipment(scheduledDelivery, maxCost, transportMode)
        .send({ from: account[0], gas: 5000000 });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Initiate Shipment Process</h2>
      <label>
        Days to Deliver :
        <input
          type="text"
          value={scheduledDelivery}
          onChange={(event) => setScheduledDelivery(event.target.value)}
        />
      </label>
      <label>
        Maximum Shipment Cost:
        <input
          type="text"
          value={maxCost}
          onChange={(event) => setMaxCost(event.target.value)}
        />
      </label>
      <label>
        Transport Mode:
        <input
          type="text"
          value={transportMode}
          onChange={(event) => setTransportMode(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
