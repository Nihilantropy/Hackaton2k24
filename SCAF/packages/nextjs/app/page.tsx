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

export default Home;