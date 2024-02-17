"use client";

import { useState } from "react";
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
  const [newGreeting, setNewGreeting] = useState("");
  const { writeAsync: setGreeting } = useScaffoldContractWrite({
    contractName: "Bank.sol",
    functionName: "setGreeting",
    args: [newGreeting],
  });
  return <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="p-5">
          <input
            value={newGreeting}
            placeholder="Wallet address"
            className="input"
            onChange={(e) => setNewGreeting(e.target.value)}
          />
          <button className="btn btn-primary" onClick={setGreeting}>Get Token</button>
        </div>
      </div>
  </>;
};

export default Home;