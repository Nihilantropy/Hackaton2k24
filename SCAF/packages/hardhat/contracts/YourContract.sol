// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(address _tokenAddress, address _owner) ERC20("MyToken", "MTK") {
        _mint(msg.sender, 100000000 * 10 ** decimals());
        owner = _owner;
        tokenAddress = _tokenAddress;
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

    // Funzione per rilasciare i token solo se l'utente ha pagato
    function releaseTokensIfPaid(address recipient) internal {
        
        

        // Rilascia 5 token al destinatario
        IERC20(tokenAddress).transfer(recipient, amount);
        
        // Emetti l'evento per notificare il rilascio dei token
        emit TokensReleased(recipient);
    }

    function mint() external payable{
    uint256 amount = 5 * 10**18; // 5 token, assumendo che il token abbia 18 decimali
        require(msg.sender, "Indirizzo del destinatario non valido");
        require(isPaid, "L'utente non ha pagato");
        _mint(msg.sender, amount);

    }

    // Funzione payable per consentire all'utente di pagare per i token
    function payForTokens() external {
        require(msg.value == 1 ether, "Invalid import");
        require(!isPaid, "User already paid");
        releaseTokensIfPaid(msg.sender);

        // Modifica lo stato della variabile isPaid
        isPaid = true;
    }

    function withdraw() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
    }
}