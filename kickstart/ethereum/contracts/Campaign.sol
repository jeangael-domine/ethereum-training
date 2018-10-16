pragma solidity ^0.4.17;

contract CampaignFactory {
    
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimumContribution) public {
        address newCampaign = new Campaign(msg.sender, minimumContribution);
        
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() view public returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        mapping(address => bool) approvals;
        uint approvalCount;
    }
    
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    Request[] public requests;
    
    modifier restricted() {
        require(msg.sender == manager, "Only a manager can do that");
        _;
    }
    
    constructor(address creator, uint minimum) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) 
        public restricted {
            Request memory newRequest = Request( {
                description: description,
                value: value,
                recipient: recipient,
                complete: false,
                approvalCount: 0
            });
            
            requests.push(newRequest);
    }
    
    function approveRequest(uint requestIndex) public {
        Request storage request = requests[requestIndex];
        
        require(approvers[msg.sender], "You cannot vote since you did not contribute");
        require(!request.approvals[msg.sender], "You have already voted!");
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalize(uint requestIndex) public restricted payable {
        Request storage request = requests[requestIndex];
        
        require(request.approvalCount > (approversCount / 2), "Not enough approvers voted Yes!");
        require(!request.complete, "The request has already been finalized");
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}