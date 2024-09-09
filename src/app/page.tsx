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
    <div className="homeContainer">
      <div className="particles">
        {init && <Particles options={ParticleOptions} />}
      </div>
      <GameBoard />
      {gameState ? (
        <button
          className="btn gradient"
          onClick={() => window.location.reload()}
        >
          Play again?
        </button>
      ) : null}
    </div>
  );
  
}
