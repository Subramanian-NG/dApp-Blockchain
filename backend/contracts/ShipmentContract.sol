// SPDX-License-Identifier: GPL-3.0

//pragma solidity >=0.7.0 <0.9.0;

pragma solidity ^0.8.8;

contract ShipmentContract
{
    address payable sender;
    address payable receiver;
    address payable carrier;
    uint shipmentMaxCost;
    uint shipmentCostIncurred;
    mapping(string=>uint) disputeTypes; // store information on dispute type and the claim amount
    string transportMode = "";
    uint public shipmentStartTime = 0;
    uint deliveryTime = 0;
    uint public scheduledDeliveryTime = 0;
    uint packageTotalWeight = 0; // how much the package weighs
    string packageType = ""; // what type of package it is - documents or food or electronics

    ShipmentStage[] public shipmentStages;
    ShipmentStage public currentShipmentStage;
    uint stageCounter = 0;
    PackageItem[] public packageItems; //details of package items
    ShipmentParameter[] public shipmentParameters;

    struct ShipmentStage
    {
        string stageName;
        uint cost;
        uint processedTime;
    }

    struct PackageItem
    {
        string itemCategory;
        uint weight;
        uint price;
    }

    struct ShipmentParameter
    {
        string parameterName;
        string value;
    }

    function registerParties(address payable sender1, address payable receiver1, address payable carrier1) public
    {
        sender = sender1;
        receiver = receiver1;
        carrier = carrier1;
    }

    function initiateShipment(uint tentativeDays, uint tentativeCost, string memory traspMode) public
    {
        //while deploying the contract, the shipment carrier has to enter these input data - max number of days for delivery,max cost of delivery, transport mode(road,air,water)
        //require(msg.sender == carrier, "Only carrier can initiate the shipment process.");
        shipmentStartTime = block.timestamp;
        scheduledDeliveryTime = tentativeDays*1 days;
        shipmentMaxCost = tentativeCost;
        transportMode = traspMode;
    }  

    function updatePackageInfo(uint256 packageCount,string[] memory inputPackageCategory,uint[] memory inputWeight, uint[] memory inputPrice,uint totalPackagingCost, uint totalWeight) public
    {
        //require(sender.balance>=shipmentMaxCost,"Insufficient funds in sender's account. Cannot proceed for packaging");
        //shipment provider has to call this method to start the shipment process. This method will update state variable currentShipmentStage
        shipmentStages.push(ShipmentStage("Packaging",totalPackagingCost,block.timestamp));
        stageCounter++;
        shipmentCostIncurred+=totalPackagingCost;
        packageTotalWeight = totalWeight;
        for(uint256 i=0;i<packageCount;i++)
        {
            packageItems.push(PackageItem(inputPackageCategory[i],inputWeight[i],inputPrice[i]));
        }
        //shipmentParameters.push(ShipmentParameter("Warehouse Temperature",warehouseTemperature));
        //shipmentParameters.push(ShipmentParameter("Warehouse Location",wareHouseLocation));
        //upload package photo to off chain components
    }

    function updatePrimaryTransportInfo(string memory insuranceCost, string memory clearenceCost, uint totalCostInvolved) public
    {
        //shipment provider has to call this method info such as insurance, custom clearence docs and cost involved
        shipmentParameters.push(ShipmentParameter("Insurance cost",insuranceCost));
        shipmentParameters.push(ShipmentParameter("Custom clearence cost",clearenceCost));
        require(sender.balance>=shipmentMaxCost,"Insufficient funds in sender's account. Cannot proceed for Transport");
        shipmentStages.push(ShipmentStage("Dispatched",totalCostInvolved,block.timestamp));
        stageCounter++;
        shipmentCostIncurred+=totalCostInvolved;
    }

    function postDelivery() public
    {
        //shipment provider has to call this method to update after delivery info
        //require(sender.balance>=shipmentMaxCost,"Insufficient funds in sender's account. Cannot proceed for Delivery");
        shipmentStages.push(ShipmentStage("Package Delivered",0,block.timestamp));
        stageCounter++;
        deliveryTime = block.timestamp;
        //transfer ether to carrier
        //carrier.transfer(shipmentMaxCost);
        //upload package delivered photo to off chain components
        //notify sender at this stage.  
    }

    function initiateDisputeClaim(uint damageCost, uint lostPackageCost, uint delayCost) public
    {
        //the sender/receiver has to call this method after verifying the delivery to submit a claim in case of delay or loss or damage
        //require(msg.sender == sender || msg.sender == receiver, "Only sender or receiver can initiate claim for dispute");
        if( deliveryTime > scheduledDeliveryTime)
        {
            disputeTypes["delay"] = delayCost;
        }
        disputeTypes["damage"] = damageCost;
        disputeTypes["lost"] = lostPackageCost;
        //upload claim documents off chain
        uint claimCost = delayCost + damageCost + lostPackageCost;
        //transfer ether to sender in case of dispute
        //sender.transfer(claimCost);
    }

    function getPackageDetails() public view returns(PackageItem[] memory)
    {
        return packageItems;
    }

    function getCurrentState() public view returns(ShipmentStage memory)
    {
        return shipmentStages[stageCounter-1];
    }

    function getShipmentProgress() public view returns(ShipmentStage[] memory)
    {
        return shipmentStages;
    }
}
