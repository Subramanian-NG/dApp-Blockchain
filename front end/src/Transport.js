import { useState, useEffect     } from "react";
import Web3 from "web3";
import ContractArtifact from "./ShipmentContract.json";

function MyForm() {
  const [insuranceCost, setInsuranceCost] = useState("");
  const [customClearanceCost, setCustomClearanceCost] = useState("");
  const [totalTransportCost, setTotalTransportCost] = useState("");
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
        .updatePrimaryTransportInfo(
          insuranceCost,
          customClearanceCost,
          totalTransportCost
        )
        .send({ from: account[0] });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Transport Information</h2>
      <label>
        Insurance Cost:
        <input
          type="text"
          value={insuranceCost}
          onChange={(event) => setInsuranceCost(event.target.value)}
        />
      </label>
      <label>
        Custom Clearance Cost:
        <input
          type="text"
          value={customClearanceCost}
          onChange={(event) => setCustomClearanceCost(event.target.value)}
        />
      </label>
      <label>
        Total Transport Cost:
        <input
          type="text"
          value={totalTransportCost}
          onChange={(event) => setTotalTransportCost(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
