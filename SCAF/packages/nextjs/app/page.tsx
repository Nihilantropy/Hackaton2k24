<<<<<<< HEAD
"use client";

import Link from 'next/link';
import type { NextPage } from "next";

const Home: NextPage = () => {
  return <>
      <title>SCAFF - Home</title>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&display=swap" rel="stylesheet"></link>

      <div className="sfondo" style={{backgroundImage: "https://i.pinimg.com/originals/26/e1/fc/26e1fc2a4778a6fddee664468cf0063b.gif",  backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center",}}>
        <div className="flex items-center flex-col flex-grow pt-10">
          <h1 className='titolo'>Welcome to SCAFF</h1>
          <br/>
          <br/>
          <br/>
          <br/>
          <Link href="/game" className='pulsante'>Start to play</Link>
        </div>
      </div>
  </>;
};

=======
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
} from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {

  const { writeAsync: Pay } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "PayContract",
    value: BigInt(ethers.parseEther("0.0001").toString()),
  });

  return <>
          <div>
          <button className="btn btn-primary" onClick={Pay}>Buy 5 Token for 0.001 ETH</button>
          <div>
        {/* Aggiungi un bottone che reindirizza alla pagina Game.tsx */}
        <Link href="/game" passHref>
          <button className="btn btn-secondary">Go to Game Page</button>
        </Link>
      </div>
        </div>
        </>;
};

>>>>>>> 2346d2ba91fd8be073cf4dfc91a737e86bb977ff
export default Home;