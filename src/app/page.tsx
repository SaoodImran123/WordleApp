"use client"
import { useEffect, useState } from "react";
import WordleGrid from "./_components/wordleGrid/WordleGrid";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css'; 
import { useAppDispatch, useAppSelector } from "./store/hooks";
import toast from "react-hot-toast";
import { setCodes, setColors } from "./store/codesSlice";

const colorMap = ['bg-grayCircle', 'bg-orangeCircle', 'bg-greenCircle']
const checkAlpha = (key: string) => /^[a-zA-Z]$/.test(key)
const translateKey = (key: string): string => {
  switch (key) {
    case '{enter}':
      return 'Enter';
    case '{bksp}':
      return 'Backspace';
    default:
      return key;
  }
};

export default function Home() {
  const [row, setRow] = useState<number>(0)
  const codes = useAppSelector((state) => state.codes.codes);
  const dispatch = useAppDispatch()
  const layout = {
    default: [
      'q w e r t y u i o p {bksp}',
      'a s d f g h j k l {enter}',
      'z x c v b n m'
    ],
  };
  const handleKeyDown = async (e: KeyboardEvent) => {
    console.log(e.key)
    if (e.key === 'Enter') {
      if (codes[row].length < 5) {
        toast.error("Too few characters!"), {
          duration: 1000,
        }
      } else {
        try {
          const response = await fetch('https://wordle-apis.vercel.app/api/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ guess: codes[row] })
          })
          if (!response.ok) {
            throw new Error('Response not ok');
          }
          const result = await response.json()

          if (result.is_valid_word == true) {
            const newColors = result.score.map((score: number) => colorMap[score])
            console.log(newColors)
            dispatch(setColors({ index: row, colors: newColors }))
            if (JSON.stringify(result.score) === JSON.stringify([2, 2, 2, 2, 2])){
              toast.success("You win!", {duration: 1000})
            }
            else if (row < 5 ){
              setRow(prev => prev+1)
            }
            else{
              toast.error("Nice try!", {duration: 10000})
            }
            
          }
          else {
            toast.error("Not a valid word.", {
              duration: 1000,
            });
          }
        }
        catch (error) {
          console.log("Error in fetch request")
        }

      }
    }
    else if (checkAlpha(e.key)) {
      if (codes[row].length < 5) {
        dispatch(setCodes({ index: row, code: codes[row] + e.key.toUpperCase() }))
      }
    }
    else if (e.key === 'Backspace') {
      e.preventDefault()
      dispatch(setCodes({ index: row, code: codes[row].slice(0, -1) }))
    }
  }

  const handleKeyboardKeyPress = (button: string) => {
    const translatedKey = translateKey(button);
    const event = new KeyboardEvent('keydown', {
      key: translatedKey,
      code: translatedKey,
      keyCode: translatedKey.charCodeAt(0),
      which: translatedKey.charCodeAt(0),
      bubbles: true
    })
    
    handleKeyDown(event);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [codes, row]);

  
  return (
   <div className="h-full flex-none">
      <WordleGrid />
      <div className="md:w-2/3 mt-4 mx-auto"> {/* Container div with 1/3 width */}
        <Keyboard layout={layout} display={{'{enter}': 'Enter','{bksp}': 'Backspace',}} onKeyPress={(button) => handleKeyboardKeyPress(button)}/>
      </div>
   </div>
  );
}
