// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YourContract is ERC20 {
    constructor(address _owner) ERC20("MyToken", "MTK") {
        _mint(msg.sender, 100000000 * 10 ** decimals());
        owner = _owner;
    }

    address public immutable owner;

    // Variabile per memorizzare l'indirizzo del token
    address public tokenAddress;

    // Variabile per tenere traccia dello stato del pagamento dell'utente
    bool public isPaid = false;

    // Evento per notificare quando i token vengono rilasciati
    event TokensReleased(address recipient);

    modifier isOwner() {
		// msg.sender: predefined variable that represents address of the account that called the current function
		require(msg.sender == owner, "Not the Owner");
		_;
	}

    function mint(address recipient) public payable {
        require(msg.value == 0.0001 ether, "Invalid import");
        bool isPaid = msg.value > 0;

        uint256 amount = 5 * 10**18; // 5 token, assumendo che il token abbia 18 decimali
        if (isPaid) {
            _mint(recipient, amount);
        emit TokensReleased(msg.sender);
        }
    }

    function withdraw() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
    }
}