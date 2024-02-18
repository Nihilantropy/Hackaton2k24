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

const Home: NextPage = () => {
  return <>
      <title>SCAFF - Home</title>
      <div style={{backgroundImage: "https://i.pinimg.com/originals/26/e1/fc/26e1fc2a4778a6fddee664468cf0063b.gif"}}></div>
  </>;
};

export default Home;