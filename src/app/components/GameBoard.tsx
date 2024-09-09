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
  //locks user out from editing code after pressing enter
  const [lockout, setLockout] = useState(false);
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
      //update state to alert appropriate row to shake
      dispatch(setShakers({ index: row, shakeStatus: true }));
    }
  };

  //handles keydown event from bother virtual and real keyboards
  const handleKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      e.stopPropagation();
      const focusedElement = document.activeElement;
      const isNavbarLinkFocused =
        focusedElement?.id === "home" ||
        focusedElement?.id === "about" ||
        focusedElement?.id === "homeMobile" ||
        focusedElement?.id === "aboutMobile";

      //if the game is not over and the user presses enter, while not focusing on the navbar for navigation
      if (e.key === "Enter" && !isNavbarLinkFocused && gameOver == false) {
        //since the user is submitting, prevent any editing of the code string
        setLockout(true);
        //if they have fewer than five characters in the active row
        if (codes[row].length < 5) {
          toast.error("Too few characters!"),
            {
              duration: 1000,
            };
            //allow editing again
          setLockout(false);
        } else {
          try {
            //make the api call to validate the word
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_WORDLE_API}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ guess: codes[row] }),
                //default option but explicit here
                cache: "force-cache",
              }
            );
            //if API response is not ok
            if (!response.ok) {
              throw new Error("Failed to fetch validation result");
            }
            //check to see that the API response format is as expected
            const result = await response.json();
            if (
              !result ||
              typeof result.is_valid_word !== "boolean" ||
              !Array.isArray(result.score)
            ) {
              throw new Error("Unexpected response format");
            }
            //if everything is ok, send the result to the handle function
            handleResponse(result);
            setLockout(false);
          } catch (error) {
            console.error("Error in fetch request:", error);
            toast.error("Failed to validate the word. Please try again.");
            setLockout(false);
          }
        }
        //if the user presses an alphabet key, update the state to reflect it
      } else if (Config.checkAlpha(e.key)) {
        if (codes[row].length < 5 && lockout == false) {
          dispatch(
            setCodes({ index: row, code: codes[row] + e.key.toUpperCase() })
          );
        }
        //if the user presses backspace to erase
      } else if (e.key === "Backspace") {
        //make it so that the user doesn't get redirected to previous page via backspace
        e.preventDefault();
        //dont allow erasing of the characters if the game is over
        if (gameOver == false && lockout == false) {
          dispatch(setCodes({ index: row, code: codes[row].slice(0, -1) }));
        }
      }
    },
    [codes, row, gameOver, lockout]
  );

  //converts virtual keyboard event into real keyboad event due to type mismatch
  const handleVirtualKeyboardKeyPress = useCallback(
    (button: string) => {
      //convert button string to be transferable to keyboard event
      const translatedKey = Config.translateKey(button);
      //new synthetic key down
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
  }, [dispatch, animationPlayed]);

  //useeffect to add an event listener for keyboard presses to entire page as opposed to any component
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    //if component unmounts, remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={`gameBoardContainer ${animationClass}`} tabIndex={0}>
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      <MainGrid />
      <div className="keyboardContainer">
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
