import { useState, useEffect } from "react";
import Web3 from "web3";
import ContractArtifact from "./ShipmentContract.json";

function MyForm() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [carrier, setCarrier] = useState("");
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
           console.log('main page connected to metamask with account--',account[0]);
      shipmentContract.methods
        .registerParties(sender, receiver, carrier)
        .send({ from: account[0] });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration of parties</h2>
      <label>
        Sender:
        <input
          type="text"
          value={sender}
          onChange={(event) => setSender(event.target.value)}
        />
      </label>
      <label>
        Receiver:
        <input
          type="text"
          value={receiver}
          onChange={(event) => setReceiver(event.target.value)}
        />
      </label>
      <label>
        Carrier:
        <input
          type="text"
          value={carrier}
          onChange={(event) => setCarrier(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
