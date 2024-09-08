"use client";
import { useEffect, useState, useMemo } from "react";
import "react-simple-keyboard/build/css/index.css";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import GameBoard from "./components/GameBoard";
import { ParticleOptions } from "./utilities/particleConfig";
import { useAppSelector } from "./store/hooks";

export default function Home() {
  //sets initizalization status for particle affects, lets engine set up first
  const [init, setInit] = useState(false);
  const gameState = useAppSelector(state => state.codes.gameOver)

  //use effect to run once to begin particle setup
  useEffect(() => {
    const initializeParticles = async () => {
      try {
        await initParticlesEngine(async (engine) => {
          await loadSlim(engine);
        });
        setInit(true);
      } catch (error) {
        console.error("Failed to initialize particles engine:", error);
      }
    };

    initializeParticles();
  }, []);


  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-[-1]">
        {init && <Particles options={ParticleOptions} />}
      </div>
      <GameBoard />
      {gameState && (
        <button
          className="bg-gradient-to-r from-gradientLeft to-gradientRight mt-10 p-4 px-10 rounded-full font-semibold text-xl text-white"
          onClick={() => window.location.reload()}
        >
          Play again?
        </button>
      )}
    </div>
  );
  
}
