import { useState, useEffect } from "react";
import Web3 from "web3";
import ContractArtifact from "./ShipmentContract.json";

function ShipmentProgressComponent() {
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
      const theResponse = await shipmentContract.methods.getShipmentProgress().call();
      const structArray = [];
      for(var i=0;i<=theResponse.length-1;i++)
      {
        structArray[i] = {stageName:theResponse[i].stageName, cost:theResponse[i].cost, processedTime:theResponse[i].processedTime}
      }
      console.log("Shipment Stage Info--", structArray);
      setData(structArray);
    }
    fetchData();
  }, []);

  const renderData = data.map((item, index) => (
    <div key={index}>
      <p><b>Shipment Stage:</b> {item.stageName}</p>
      <p><b>Processed time:</b> {item.processedTime}</p>
      <p><b>Cost Involved:</b> {item.cost}</p>
    </div>
  ));

  return (
    <div>
      <h1>Shipment Progress</h1>
      {renderData}
    </div>
  );
}

export default ShipmentProgressComponent;
