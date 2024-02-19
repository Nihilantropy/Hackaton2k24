"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import type { NextPage } from "next";
import { Howl } from 'howler';

const Home: NextPage = () => {

  useEffect(() => {
    // Primo file audio
    const sound1 = new Howl({
      src: ['/musiche/elevator.mp3'],
      autoplay: true,
      loop: true,
      volume: 0.5,
    });

    return () => {
      sound1.unload();
    };
  }, []);

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

export default Home;