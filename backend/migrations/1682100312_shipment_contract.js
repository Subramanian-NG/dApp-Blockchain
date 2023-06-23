var contract1 = artifacts.require('./ShipmentContract.sol');
module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(contract1);
};
