"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address, AddressInput, Balance } from "~~/components/scaffold-eth";
import {
  useAccountBalance,
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
} from "~~/hooks/scaffold-eth";

const Game: NextPage = () => {
  const gridItems = Array.from({ length: 9 }, (_, index) => index + 1);
  const [gameOver, setGameOver] = useState(true);
  const [turno, setTurno] = useState(1);
  const [turnop, setTurnop] = useState(0);

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function checkWinner() {
    const winningCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    let win=0;
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      const divA = document.querySelector(`.grid-item:nth-child(${a})`) as HTMLDivElement;
      const divB = document.querySelector(`.grid-item:nth-child(${b})`) as HTMLDivElement;
      const divC = document.querySelector(`.grid-item:nth-child(${c})`) as HTMLDivElement;
      if (divA.textContent == 'X' && divB.textContent == 'X' &&  divC.textContent == 'X') {
        setGameOver(true);
        alert("vinto");
        setTurno(1);
      }if (divA.textContent == 'O' && divB.textContent == 'O' &&  divC.textContent == 'O') {
        setGameOver(true);
        alert("perso");
        setTurno(1);
      }
    }
    if(win == 0){
      const divs = document.querySelectorAll('.grid-item') as NodeListOf<HTMLDivElement>;
      let allFilled = true;
      divs.forEach((div) => {
        if (div.textContent === '') {
          allFilled = false;
        }
      });
      if (allFilled) {
        setGameOver(true);
        alert("pareggio");
        setTurno(1);
      }
    }
  }

  function click_play(event: React.MouseEvent<HTMLDivElement>) {
    if (turno == 0)
    {
      setTurno(1);
      const clickedDiv = event.target as HTMLDivElement;
      const content = clickedDiv.textContent;
      if (content != 'X' && content != 'O'){
        clickedDiv.innerText = "X";
        setTurnop(turnop + 1);
        if (turnop != 5){
          do {
            var rifai =0;
            const randomNumber = getRandomInt(1, 9);
            const randomDiv = document.querySelector(`.grid-item:nth-child(${randomNumber})`) as HTMLDivElement;
            if (randomDiv.textContent != 'X' && randomDiv.textContent != 'O'){
              rifai=1;
              randomDiv.innerText = "O";
            }
          } while (rifai != 1);
        }
      }
      setTurno(0);
      checkWinner();
    }
  }

  function reset() {
    setTurno(0);
    setTurnop(0);
    const divs = document.querySelectorAll('.grid-item') as NodeListOf<HTMLDivElement>;
    divs.forEach((div) => {
      div.textContent = '';
    });
    setGameOver(false);
  }

  return <>
      <title>SCAFF - Game</title>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="grid-container">
          {gridItems.map((item) => (
            <div key={item} onClick={click_play} className="grid-item"></div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={reset} style={{ display: gameOver ? 'block' : 'none' }}>For play, pay 1 Token</button>
      </div>
  </>;
};

export default Game;
