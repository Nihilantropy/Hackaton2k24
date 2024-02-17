// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YourContract is ERC20 {
    constructor(address _owner) ERC20("PlayToken", "PLAY") {
        _mint(msg.sender, 1000 * 10 ** decimals());
        owner = _owner;
    }

    uint256 constant public MAX_TRANSACTIONS_PER_DAY = 5;

    mapping(address => uint256) private _transactionsCount;

    address public immutable owner;

    // Evento per notificare quando i token vengono rilasciati
    event TokensReleased(address recipient);

    modifier isOwner() {
		// msg.sender: predefined variable that represents address of the account that called the current function
		require(msg.sender == owner, "Not the Owner");
		_;
	}

function PayContract() public payable {
    require(msg.value == 0.0001 ether, "Invalid import");

    // Chiama la funzione TokenIsPaid passando true
    TokenIsPaid(true);
}


function TokenIsPaid(bool isPaid) public {
    require(isPaid, "Payment not made");

    // Verifica se l'utente ha raggiunto il limite massimo di transazioni giornaliere
   // require(_transactionsCount[msg.sender] < MAX_TRANSACTIONS_PER_DAY, "Max transactions per day reached");
    
    // Aggiorna lo stato delle transazioni
    _transactionsCount[msg.sender]++;

    // Mint dei token e trasferimento all'utente
    uint256 amount = 5 * 10**18; // 5 token, assumendo che il token abbia 18 decimali
    _mint(msg.sender, amount);

    // Emetti l'evento per notificare il rilascio dei token
    emit TokensReleased(msg.sender);
}


    function withdraw() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
    }
}