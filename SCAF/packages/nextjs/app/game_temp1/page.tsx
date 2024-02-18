"use client";

import { useState } from "react";
import Link from 'next/link';
import { ethers } from "ethers";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address, AddressInput, Balance } from "~~/components/scaffold-eth";
import {
  useAccountBalance,
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

const Game: NextPage = () => {

  const { writeAsync: BurnToken } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "burnPlayToken",
  });

  // Definisci la funzione che vuoi eseguire quando l'evento viene ricevuto
  const handleBeginPlay = () => {
    console.log('Evento BeginPlay ricevuto:');
    BeginPlay(); // Chiama qui la tua funzione BeginPlay
  };

  useScaffoldEventSubscriber ({
    contractName: "YourContract",
    eventName: "BeginPlay",
    listener: handleBeginPlay,
  })

  function BeginPlay() {
    // Logica per gestire l'inizio del gioco
    console.log("Inizio del gioco");
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={BurnToken}>Play for 1 Token</button>
    </div>
  );
};

export default Game;
