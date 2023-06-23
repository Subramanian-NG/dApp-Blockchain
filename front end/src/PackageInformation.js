import { useState, useEffect } from "react";
import Web3 from "web3";
import ContractArtifact from "./ShipmentContract.json";
function MyForm() {
  const [totalWeight, setTotalWeight] = useState("");
  const [packageCost, setPackageCost] = useState("");
  const [formData, setFormData] = useState({
    row1col1: "",
    row1col2: "",
    row1col3: "",
    row2col1: "",
    row2col2: "",
    row2col3: "",
    row3col1: "",
    row3col2: "",
    row3col3: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const inputPackageCategoryArr = [
        formData.row1col1,
        formData.row2col1,
        formData.row3col1,
      ];
      const inputWeightArr = [
        formData.row1col2,
        formData.row2col2,
        formData.row3col2,
      ];
      const inputPriceArr = [formData.row1col3, formData.row2col3, formData.row3col3];
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
       });
       const contractABI = ContractArtifact.abi;
       const contractAddress = ContractArtifact.networks[5777].address; 
       const web3 = new Web3(Web3.givenProvider);
       const shipmentContract = new web3.eth.Contract(contractABI, contractAddress);
      shipmentContract.methods
        .updatePackageInfo(
          3,
          inputPackageCategoryArr,
          inputWeightArr,
          inputPriceArr,
          packageCost,
          totalWeight
        )
        .send({ from: account[0] });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Package Information</h2>
      <div>
        <label>Package Category</label>
        <input
          type="text"
          name="row1col1"
          value={formData.row1col1}
          onChange={handleChange}
        />
        <label>Package Weight</label>
        <input
          type="text"
          name="row1col2"
          value={formData.row1col2}
          onChange={handleChange}
        />
        <label>Package price</label>
        <input
          type="text"
          name="row1col3"
          value={formData.row1col3}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Package Category</label>
        <input
          type="text"
          name="row2col1"
          value={formData.row2col1}
          onChange={handleChange}
        />
        <label>Package Weight</label>
        <input
          type="text"
          name="row2col2"
          value={formData.row2col2}
          onChange={handleChange}
        />
        <label>Package price</label>
        <input
          type="text"
          name="row2col3"
          value={formData.row2col3}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Package Category</label>
        <input
          type="text"
          name="row3col1"
          value={formData.row3col1}
          onChange={handleChange}
        />
        <label>Package Weight</label>
        <input
          type="text"
          name="row3col2"
          value={formData.row3col2}
          onChange={handleChange}
        />
        <label>Package price</label>
        <input
          type="text"
          name="row3col3"
          value={formData.row3col3}
          onChange={handleChange}
        />
      </div>
      <label>
        Total Package Weight:
        <input
          type="text"
          value={totalWeight}
          onChange={(event) => setTotalWeight(event.target.value)}
        />
      </label>
      <label>
        Package Cost:
        <input
          type="text"
          value={packageCost}
          onChange={(event) => setPackageCost(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
