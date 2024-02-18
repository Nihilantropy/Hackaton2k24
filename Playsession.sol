// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract GameContract {
    // Indirizzo del token utilizzato nel gioco
    address public tokenAddress;

    // Evento emesso quando un utente vince il gioco
    event GameWon(address indexed player, uint256 amountWon);

    // Evento emesso quando un utente perde il gioco
    event GameLost(address indexed player);

    // Modificatore per verificare che il contratto abbia abbastanza token per giocare
    modifier hasEnoughTokens(uint256 amount) {
        require(
            IERC20(tokenAddress).balanceOf(msg.sender) >= amount,
            "Insufficient balance"
        );
        _;
    }

    // Modificatore per verificare che il contratto abbia abbastanza token per raddoppiarne la quantità
    modifier hasEnoughTokensToDouble(uint256 amount) {
        require(
            IERC20(tokenAddress).balanceOf(msg.sender) >= amount,
            "Insufficient balance to double"
        );
        _;
    }

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    // Funzione per giocare al gioco
    function playGame() external hasEnoughTokens(1) {
        // Simuliamo una situazione di gioco in cui l'utente ha il 50% di possibilità di vincere
        if (random() % 2 == 0) {
            // L'utente ha vinto il gioco, raddoppiamo i suoi token
            uint256 balanceBefore = IERC20(tokenAddress).balanceOf(msg.sender);
            ERC20Burnable(tokenAddress).burn(1); // Bruciamo il token giocato
            ERC20Burnable(tokenAddress).mint(msg.sender, 2); // Raddoppiamo i token
            uint256 balanceAfter = IERC20(tokenAddress).balanceOf(msg.sender);
            emit GameWon(msg.sender, balanceAfter - balanceBefore);
        } else {
            // L'utente ha perso il gioco, bruciamo il token giocato
            ERC20Burnable(tokenAddress).burn(1);
            emit GameLost(msg.sender);
        }
    }

    // Funzione per generare un numero casuale (semplice implementazione per scopi dimostrativi)
    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender)));
    }
}
