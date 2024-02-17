// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YourContract is ERC20 {
    constructor(address _owner) ERC20("MyToken", "MTK") {
        _mint(msg.sender, 100000000 * 10 ** decimals());
        owner = _owner;
    }

    uint256 constant public MAX_TRANSACTIONS_PER_DAY = 5;
    uint256 constant public DAY_IN_SECONDS = 86400;

    mapping(address => uint256) private _transactionsCount;
    mapping(address => uint256) private _lastTransactionTime;

    address public immutable owner;

    // Variabile per memorizzare l'indirizzo del token
    address public tokenAddress;

    // Evento per notificare quando i token vengono rilasciati
    event TokensReleased(address recipient);

    modifier isOwner() {
		// msg.sender: predefined variable that represents address of the account that called the current function
		require(msg.sender == owner, "Not the Owner");
		_;
	}

    function SendTokenIfPaid() public payable {
        bool isPaid;
        require(msg.value == 0.0001 ether, "Invalid import");
        require(_transactionsCount[msg.sender] < MAX_TRANSACTIONS_PER_DAY, "Max transactions per day reached");
        require(block.timestamp - _lastTransactionTime[msg.sender] >= DAY_IN_SECONDS, "Wait 24 hours to reset transactions count");
        
        isPaid = true;
        _transactionsCount[msg.sender]++;
        _lastTransactionTime[msg.sender] = block.timestamp;

        uint256 amount = 5 * 10**18; // 5 token, assumendo che il token abbia 18 decimali
        if (isPaid) {
            transfer(msg.sender, amount);
        emit TokensReleased(msg.sender);
        }
    }

    function withdraw() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
    }
}