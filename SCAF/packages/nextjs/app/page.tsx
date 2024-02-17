"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useWaitForTransaction } from 'wagmi'
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
  const [address_user, set_address_user] = useState("");
  const { data: greeting, waitForTransaction } = useScaffoldContractRead({
    contractName: "TokenReleaseContract",
    functionName: "payForTokens",
    args: [address_user],
  });
  
  const handleGetTokenClick = async () => {
    if (address_user == ""){
      alert("Wallet address invalid");
    }
    else{
      try {
        await waitForTransaction();
        alert("Token created successfully");
        const holaDiv = document.getElementById('game') as HTMLElement;
        if (holaDiv) {
          holaDiv.style.display = 'block';
        }
        const wallet_id = document.getElementById('wallet') as HTMLElement;
        if (wallet_id) {
          wallet_id.style.display = 'none';
        }
      } catch (error) {
        alert("Wallet address invalid");
      }
    }
  };

  return (
    <>
      <title>SCAF</title>
      <div id="wallet" className="flex items-center flex-col flex-grow pt-10">
        <div className="p-5">
          <input
            value={address_user}
            onChange={(e) => set_address_user(e.target.value)}
            placeholder="Input your wallet address"
            className="input"
          />
          <button className="btn btn-primary" onClick={handleGetTokenClick}>Get Token</button>
        </div>
      </div>
      <div id="game" className="flex items-center flex-col flex-grow pt-10" style={{ display: 'none'}}>
<h1>hola</h1>
      </div>
    </>
  );
};

export default Home;
