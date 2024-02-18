import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0" style={{ backgroundColor: '#6B4E71'! }}>
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        </div>
      </div>
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="flex justify-center items-center gap-2">
              <p className="m-0 text-center">
                Built with <HeartIcon className="inline-block h-4 w-4" /> by: 
              </p>
              <a
                className="flex justify-center items-center gap-1"
                href="https://www.linkedin.com/in/sara-privitera-5b6332182/"
                target="_blank"
                rel="noreferrer"
              ><span className="link">Sara Privitera</span></a>
              <span>·</span>
              <a
                className="flex justify-center items-center gap-1"
                href=""
                target="_blank"
                rel="noreferrer"
              ><span className="link">Claudio Rea</span></a>
              <span>·</span>
              <a
                className="flex justify-center items-center gap-1"
                href="https://andreianghi.ddns.net"
                target="_blank"
                rel="noreferrer"
              ><span className="link">Andrei Anghi[Angly colui che regna]</span></a>
              <span>·</span>
              <a
                className="flex justify-center items-center gap-1"
                href=""
                target="_blank"
                rel="noreferrer"
              ><span className="link">Francesco Fontana</span></a>
              <span>·</span>
              <a
                className="flex justify-center items-center gap-1"
                href="https://www.linkedin.com/in/fabiola-chiericato-4094a32b3/"
                target="_blank"
                rel="noreferrer"
              ><span className="link">Fabiola Chiericato</span></a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
