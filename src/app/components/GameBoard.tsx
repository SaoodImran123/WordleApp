"use client";
import { useEffect, useState, useCallback } from "react";
import MainGrid from "./Grid/MainGrid";
import "react-simple-keyboard/build/css/index.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import toast from "react-hot-toast";
import {
  setAnimation,
  setCodes,
  setColors,
  setCurrentRow,
  setShakers,
  setGameOver,
} from "../store/codesSlice";
import dynamic from "next/dynamic";
import * as Config from "../utilities/config";

//dynamically import these since they are heavier, using lazy loading
const Keyboard = dynamic(() => import("react-simple-keyboard"), { ssr: false });
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

//colorMap with index corresponding to API response (0 is gray, 1 is orange, 2 is green)
const colorMap = [
  Config.COLOR_CLASSES.GRAY,
  Config.COLOR_CLASSES.ORANGE,
  Config.COLOR_CLASSES.GREEN,
];

export default function GameBoard() {
  //maintain current row the user is able to enter text for
  const row = useAppSelector((states) => states.codes.currentRow);
  //maintain if game is over or not yet
  const gameOver = useAppSelector((states) => states.codes.gameOver);
  //maintain if confetti should be shown
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  //maintain state of if the GameBoard should scroll in from the bottom, should only occur on initial page load not re-renders
  const animationPlayed = useAppSelector((state) => state.codes.animation);
  //is used to add the tailwind class for animating the GameBoard scroll on based on animationPlayed state
  const [animationClass, setAnimationClass] = useState("");
  //maintains the user inputted text of the current active row
  const codes = useAppSelector((state) => state.codes.codes);
  const dispatch = useAppDispatch();

  //handles the API response 
  const handleResponse = (result: any) => {
    //if the word is valid
    if (result.is_valid_word) {
      //determine the new colors for the current row, and update it using dispatch
      const newColors = result.score.map((score: number) => colorMap[score]);
      dispatch(setColors({ index: row, colors: newColors }));
      //if the result is a winning score (all 2's) set the win state and end the game, display the confetti
      if (
        JSON.stringify(result.score) === JSON.stringify(Config.WINNING_SCORE)
      ) {
        toast.success("You win!", Config.TOAST_CONFIG.LONG);
        dispatch(setGameOver(true));
        setShowConfetti(true);
      //otherwise, if the game can continue, move onto next row
      } else if (row < 5) {
        dispatch(setCurrentRow(row + 1));
      //else if the game is over, end the game by setting winState
      } else {
        toast.error("Nice try!", Config.TOAST_CONFIG.MEDIUM);
        dispatch(setGameOver(true));
      }
    } else {
      toast.error("Not a valid word.", Config.TOAST_CONFIG.SHORT);
      dispatch(setShakers({ index: row, shakeStatus: true }));
    }
  };

  //handles keydown event from bother virtual and real keyboards
  const handleKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      const focusedElement = document.activeElement;
      const isNavbarLinkFocused =
        focusedElement?.id === "home" ||
        focusedElement?.id === "about" ||
        focusedElement?.id === "homeMobile" ||
        focusedElement?.id === "aboutMobile";

      if (e.key === "Enter" && !isNavbarLinkFocused && gameOver == false) {
        if (codes[row].length < 5) {
          toast.error("Too few characters!"),
            {
              duration: 1000,
            };
        } else {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_WORDLE_API}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ guess: codes[row] }),
                cache: "force-cache",
              }
            );
            if (!response.ok) {
              throw new Error("Failed to fetch validation result");
            }
            const result = await response.json();
            if (
              !result ||
              typeof result.is_valid_word !== "boolean" ||
              !Array.isArray(result.score)
            ) {
              throw new Error("Unexpected response format");
            }
            handleResponse(result);
          } catch (error) {
            console.error("Error in fetch request:", error);
            toast.error("Failed to validate the word. Please try again.");
          }
        }
      } else if (Config.checkAlpha(e.key)) {
        if (codes[row].length < 5) {
          dispatch(
            setCodes({ index: row, code: codes[row] + e.key.toUpperCase() })
          );
        }
      } else if (e.key === "Backspace") {
        e.preventDefault();
        if (gameOver == false) {
          dispatch(setCodes({ index: row, code: codes[row].slice(0, -1) }));
        }
      }
    },
    [codes, row, gameOver]
  );

  //converts virtual keyboard event into real keyboad event due to type mismatch
  const handleVirtualKeyboardKeyPress = useCallback(
    (button: string) => {
      const translatedKey = Config.translateKey(button);
      const event = new KeyboardEvent("keydown", {
        key: translatedKey,
        code: translatedKey,
        keyCode: translatedKey.charCodeAt(0),
        which: translatedKey.charCodeAt(0),
        bubbles: true,
        cancelable: true,
      });
      handleKeyDown(event);
    },
    [handleKeyDown]
  );

  //useeffect runs once to set animation scroll in state
  useEffect(() => {
    if (animationPlayed == false) {
      setAnimationClass("scroll-in-bottom");
      dispatch(setAnimation(true));
    }
  }, []);

  //useeffect to add an event listener for keyboard presses to entire page
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className={`md:w-[500px] md:h-[650px] bg-white bg-opacity-30 py-5 rounded-2xl ${animationClass}`}
      tabIndex={0}
    >
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      <MainGrid />
      <div className="md:w-4/5 mt-4 mx-auto">
        <Keyboard
          layout={Config.layout}
          theme={"hg-theme-default keyboard-bg"}
          display={{ "{enter}": "Enter", "{bksp}": "Backspace" }}
          onKeyPress={(button) => handleVirtualKeyboardKeyPress(button)}
          buttonTheme={Config.buttonTheme}
          disableButtonHold={true}
        />
      </div>
    </div>
  );
}
