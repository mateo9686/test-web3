pragma solidity ^0.5.0;

contract Property {
    string public hash;
    address public owner;

    constructor(string memory _hash, address _owner) public {
        hash = _hash;
        owner = _owner;
    }
}

contract ipDatabase {
    uint256 public ipCount;
    mapping(string => address) public ipDatabase;

    function addEntry(string memory hash) public returns (address) {
        require(
            ipDatabase[hash] == address(0x0),
            "Hash already exists in the Database!"
        );
        ipCount++;
        Property pnew = new Property(hash, msg.sender);
        ipDatabase[hash] = address(pnew);
    }

    function getOwner(string memory hash) public view returns (address) {
        //require(ipDatabase[hash]==address(0x0),"Hash doesnt exist");
        Property p = Property(address(ipDatabase[hash]));
        return p.owner();
    }
}
