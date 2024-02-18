import type { NextPage } from 'next';
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Game: NextPage = () => {

  const { writeAsync: BurnToken } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "burnPlayToken",
  });

  return (
    <div>
      <button className="btn btn-primary" onClick={BurnToken}>Play for 1 Token</button>
    </div>
  );
};

export default Game;
