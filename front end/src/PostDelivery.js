import { useState, useEffect } from "react";
import Web3 from "web3";
import ContractArtifact from "./ShipmentContract.json";

function PostDeliveryComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function postDelivery() {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const contractABI = ContractArtifact.abi;
      const contractAddress = ContractArtifact.networks[5777].address;
      const web3 = new Web3(Web3.givenProvider);
      const shipmentContract = new web3.eth.Contract(
        contractABI,
        contractAddress
      );
      await shipmentContract.methods.postDelivery().send({ from: account[0], gas: 5000000 });;
    }
    postDelivery();
  }, []);

  return (
    <div>
      <h1>Post Delivery update</h1>
      <div>
        Package Delivered and payment processed.
      </div>
    </div>
  );
}

export default PostDeliveryComponent;
