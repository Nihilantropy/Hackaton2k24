// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract YourContract is ERC20, ERC20Burnable {
    constructor(address _owner) ERC20("PlayToken", "PLAY") {
        _mint(msg.sender, 1000 * 10 ** decimals());
        owner = _owner;
    }

    uint256 constant public MAX_TRANSACTIONS_PER_DAY = 5;

    mapping(address => uint256) private _transactionsCount;

    address public immutable owner;

    event BeginPlay(address player);

    // Evento per notificare quando i token vengono rilasciati
    event TokensReleased(address recipient);

    modifier isOwner() {
		// msg.sender: predefined variable that represents address of the account that called the current function
		require(msg.sender == owner, "Not the Owner");
		_;
	}

function PayContract() public payable {
    require(msg.value == 0.0001 ether, "Invalid import");
    require(_transactionsCount[msg.sender] < MAX_TRANSACTIONS_PER_DAY, "You've played enought boy!");

    // Chiama la funzione TokenIsPaid passando true
    TokenIsPaid(true);
}

<<<<<<< HEAD
=======

>>>>>>> 2346d2ba91fd8be073cf4dfc91a737e86bb977ff
function TokenIsPaid(bool isPaid) private {
    require(isPaid, "Payment not made");
    
    // Aggiorna lo stato delle transazioni
    _transactionsCount[msg.sender]++;

    // Mint dei token e trasferimento all'utente
    uint256 amount = 5 * 10**18; // 5 token, assumendo che il token abbia 18 decimali
    _mint(msg.sender, amount);

    // Emetti l'evento per notificare il rilascio dei token
    emit TokensReleased(msg.sender);
}

    function burnPlayToken() external {
        // Verifica che l'utente abbia almeno 1 token "PLAY" da bruciare
<<<<<<< HEAD
        require(balanceOf(msg.sender) >= 1000000000000000000, "Insufficient PLAY tokens to burn");
=======
        require(balanceOf(msg.sender) >= 1, "Insufficient PLAY tokens to burn");
>>>>>>> 2346d2ba91fd8be073cf4dfc91a737e86bb977ff

        // Brucia 1 token "PLAY" dall'utente che chiama questa funzione
        _burn(msg.sender, 1000000000000000000);

        // Emetti l'evento BeginPlay
        emit BeginPlay(msg.sender);
    }

<<<<<<< HEAD
    function sendTwoTokens() public payable {
        uint256 amount = 2 * 10**18;
        _mint(msg.sender, amount);
    } 

=======
>>>>>>> 2346d2ba91fd8be073cf4dfc91a737e86bb977ff

    function withdraw() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
    }
}