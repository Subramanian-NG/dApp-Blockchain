import { useState, useEffect } from "react";
import Web3 from "web3";
import ContractArtifact from "./ShipmentContract.json";

function PackageDetailsComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
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
      const theResponse = await shipmentContract.methods.getPackageDetails().call();
      console.log("theResponse--", theResponse[0].itemCategory);
      const structArray = [];
      for(var i=0;i<=2;i++)
      {
        structArray[i] = {itemCategory:theResponse[i].itemCategory, weight:theResponse[i].weight, price:theResponse[i].price}
      }
      console.log("package data--", structArray);
      setData(structArray);
    }
    fetchData();
  }, []);

  const renderData = data.map((item, index) => (
    <div key={index}>
      <p><b>Package Category:</b> {item.itemCategory}</p>
      <p><b>Weight:</b> {item.weight}</p>
      <p><b>Price:</b> {item.price}</p>
    </div>
  ));

  return (
    <div>
      <h1>Package Details</h1>
      {renderData}
    </div>
  );
}

export default PackageDetailsComponent;
