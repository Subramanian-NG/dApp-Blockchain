import { useState, useEffect } from "react";
import Web3 from "web3";
import ContractArtifact from "./ShipmentContract.json";
function MyForm() {
  const [damageCost, setDamageCost] = useState("");
  const [lostPackageCost, setLostPackageCost] = useState("");
  const [delayCost, setDelayCost] = useState("");
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
        .initiateDisputeClaim(damageCost, lostPackageCost, delayCost)
        .send({ from: account[0], gas: 5000000 });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Initiate a claim for Dispute</h2>
      <label>
        Damage Cost:
        <input
          type="text"
          value={damageCost}
          onChange={(event) => setDamageCost(event.target.value)}
        />
      </label>
      <label>
        Lost Package Cost:
        <input
          type="text"
          value={lostPackageCost}
          onChange={(event) => setLostPackageCost(event.target.value)}
        />
      </label>
      <label>
        Delay Cost:
        <input
          type="text"
          value={delayCost}
          onChange={(event) => setDelayCost(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
