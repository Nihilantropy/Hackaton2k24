"use client";

import { useState } from "react";
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

  const { address } = useAccount();

  const { writeAsync: Pay } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "TokenIsPaid",
    args: [address],
   // value: ethers.parseEther("0.0001") // Aggiungi questo per impostare msg.value a 0.001 ETH
  });
  return <>
          <div className="flex items-center flex-col flex-grow pt-10">
        <div>
          <Address address={address} />
          <Balance address={address} />
        </div>
      </div>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="p-5">
          <button className="btn btn-primary" onClick={Pay}>Get Token</button>
        </div>
      </div>
  </>;
};

export default Home;