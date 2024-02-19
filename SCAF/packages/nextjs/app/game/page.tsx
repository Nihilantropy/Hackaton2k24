"use client";

import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Howl } from 'howler';
import { Address, AddressInput, Balance } from "~~/components/scaffold-eth";
import {
  useAccountBalance,
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

const Game: NextPage = () => {

  useEffect(() => {
    // Primo file audio
    const sound1 = new Howl({
      src: ['/musiche/tetris.mp3'],
      autoplay: true,
      loop: true,
      volume: 0.5,
    });

    return () => {
      sound1.unload();
    };
  }, []);

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
        //funzione
        setGameOver(true);
        setTurno(1);
        const popup_ = document.getElementById("popup") as HTMLDivElement;
        popup_.style.display='block';
        popup_.innerHTML='Victory! you earned 2 Token';
        SendTwoTokens();
        win=1;
      }if (divA.textContent == 'O' && divB.textContent == 'O' &&  divC.textContent == 'O') {
        setGameOver(true);
        setTurno(1);
        const popup_ = document.getElementById("popup") as HTMLDivElement;
        popup_.style.display='block';
        popup_.innerHTML='Defeat!';
        win=1;
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
        setTurno(1);
        const popup_ = document.getElementById("popup") as HTMLDivElement;
        popup_.style.display='block';
        popup_.innerHTML='Draw! But not really, Sorry :(';
      }
    }
  }

  function click_play(event: React.MouseEvent<HTMLDivElement>) {
    let anti=0;
    if (turno == 0)
    {
      setTurno(1);
      const clickedDiv = event.target as HTMLDivElement;
      const content = clickedDiv.textContent;
      if (content != 'X' && content != 'O'){
        clickedDiv.innerText = "X";
        setTurnop(turnop + 1);
        const emptyCells = document.querySelectorAll('.grid-item:not(:has(*))');
        if (emptyCells.length > 2) {
          do {
            var rifai =0;
            const randomNumber = getRandomInt(1, 9);
            const randomDiv = document.querySelector(`.grid-item:nth-child(${randomNumber})`) as HTMLDivElement;
            if (randomDiv.textContent != 'X' && randomDiv.textContent != 'O'){
              rifai=1;
              randomDiv.innerText = "O";
            }
            anti++;
            if(anti >= 50)
              break;
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
    const popup_ = document.getElementById("popup") as HTMLDivElement;
    popup_.style.display='none';
  }

  const { writeAsync: BurnToken } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "burnPlayToken",
  });

    // Definisci la funzione che vuoi eseguire quando l'evento viene ricevuto
    const handleBeginPlay = () => {
    console.log('Evento BeginPlay ricevuto:');
    reset(); // Chiama qui la tua funzione BeginPlay
    };

  useScaffoldEventSubscriber ({
    contractName: "YourContract",
    eventName: "BeginPlay",
    listener: handleBeginPlay,
  })

  const { writeAsync: SendTwoTokens } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "sendTwoTokens",
  });

  return <>
      <title>SCAFF - Game</title>
      <div className="sfondo" style={{backgroundImage: "https://i.pinimg.com/originals/26/e1/fc/26e1fc2a4778a6fddee664468cf0063b.gif",  backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center",}}>
        <div className="flex items-center flex-col flex-grow pt-10">
          <div style={{ display: 'none'}} id="popup"></div>
          <div className="grid-container">
            {gridItems.map((item) => (
              <div key={item} onClick={click_play} className="grid-item"></div>
            ))}
          </div>
          <br/>
          <button className="btn btn-primary" onClick={BurnToken} style={{ display: gameOver ? 'block' : 'none' }}>Burn one token to play</button>
        </div>
      </div>
  </>;
};

export default Game;
