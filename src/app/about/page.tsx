'use client'
import React, {useState, useEffect, useMemo} from "react"
import Link from "next/link"
import { ParticleOptions } from "../utilities/particleConfig";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";


export default function About() {
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
        <div className="w-full flex items-center flex-col">
            <div className="particles">
            {init && <Particles options={ParticleOptions} />}
            </div>
            <div className="md:h-[500px] md:w-[600px] transparentBox text-white md:text-2xl text-xl px-2 rounded-3xl">
                <div className="text-center font-bold text-4xl">Instructions</div>
                <div className="mt-2 flex flex-col justify-content">
                    <span className="pb-2"><span className="font-semibold">1. Guess the Word: </span>Crack the five-letter word of the day</span>
                    <span className="pb-2"><span className="font-semibold">2. Six Shots: </span>You&apos;ve got six tries to get it right.</span>
                    <span className="pb-2"><span className="font-semibold">3. Gray Means Nope: </span>Gray boxes show letters that aren&apos;t in the word at all.</span>
                    <span className="pb-2"><span className="font-semibold">4. Orange is Close: </span>Orange boxes mean the letter&apos;s in there, just not in the right spot!</span>
                    <span className="pb-2"><span className="font-semibold">5. Green is Gold: </span>Green boxes? Nailed it! The letter is exactly where it belongs.</span>
                    <span className="pb-2"><span className="font-semibold">6. Keep it Real: </span>Only real words count, so you won&apos;t waste any guesses on gibberish!</span>
                </div>
            </div>
            <Link className="btn gradient" href="/">Ready to play?</Link>
        </div>

    )
}
