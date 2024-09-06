import React from "react"
import Link from "next/link"


export default function About() {

    return (
        <div className="w-full  flex items-center flex-col">
            <div className="md:h-2/3 md:w-2/4 bg-white bg-opacity-30 text-white md:text-3xl text-xl px-2 rounded-3xl">
                <div className="text-center font-bold text-4xl">Instructions</div>
                <div className="flex flex-col justify-content">
                    <span className="pb-2"><span className="font-bold">1. Guess the Word: </span>Crack the five-letter word of the day</span>
                    <span className="pb-2"><span className="font-bold">2. Six Shots: </span>You&apos;ve got six tries to get it right.</span>
                    <span className="pb-2"><span className="font-bold">3. Gray Means Nope: </span>Gray boxes show letters that aren&apos;t in the word at all.</span>
                    <span className="pb-2"><span className="font-bold">4. Orange is Close: </span>Orange boxes mean the letter&apos;s in there, just not in the right spot!</span>
                    <span className="pb-2"><span className="font-bold">5. Green is Gold: </span>Green boxes? Nailed it! The letter is exactly where it belongs.</span>
                    <span className="pb-2"><span className="font-bold">6. Keep it Real: </span>Only real words count, so you won&apos;t waste any guesses on gibberish!</span>
                </div>
            </div>
            <Link className="bg-gradient-to-r from-gradientLeft to-gradientRight mt-10 p-4 md:px-10 rounded-full font-semibold text-xl text-white" href="/">Ready to play?</Link>
        </div>

    )
}
