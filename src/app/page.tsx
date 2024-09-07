"use client";
import { useEffect, useState, useMemo } from "react";
import "react-simple-keyboard/build/css/index.css";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import GameBoard from "./components/GameBoard";
import { ParticleOptions } from "./utilities/particleConfig";

export default function Home() {
  //sets initizalization status for particle affects, lets engine set up first
  const [init, setInit] = useState(false);

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
    <div className="h-full w-full md:flex flex-col items-center">
      <div className="absolute inset-0 z-[-1]">
        {init && <Particles options={ParticleOptions} />}
      </div>
      <GameBoard />
    </div>
  );
}
