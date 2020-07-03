pragma solidity ^0.5.0;

contract Property {
    string public fingerprint;
    address public owner;

    constructor(string memory _fingerprint, address _owner) public {
        fingerprint = _fingerprint;
        owner = _owner;
    }
}