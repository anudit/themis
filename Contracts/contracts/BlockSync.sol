// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.0;

contract BlockSync {

    address owner;
    address syncer;

    uint256 lastSyncBlockNumber = 0;
    mapping (bytes32 => bool) public validHashes;
    mapping (uint256 => bool) public validBlocks;

    modifier onlyOwner () {
      require(msg.sender == owner, "Restricted Access");
      _;
    }

    modifier onlySyncer () {
      require(msg.sender == syncer, "Restricted Access");
      _;
    }

    constructor(address _syncerAddress) {
        owner = msg.sender;
        syncer = _syncerAddress;
    }

    function updateSyncer(address _newSyncer)
        public onlyOwner
    {
        syncer = _newSyncer;
    }

    function addHashToBlock(uint256 _blockNumber, bytes32 _txnHash)
        public onlySyncer
    {
        if (_blockNumber > lastSyncBlockNumber){
            lastSyncBlockNumber = _blockNumber;
        }
        if (validBlocks[_blockNumber] != true){
            validBlocks[_blockNumber] == true;
        }

        validHashes[_txnHash] = true;

    }

}
