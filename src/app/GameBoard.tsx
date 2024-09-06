"use client"
import { useEffect, useState, useCallback } from "react";
import WordleGrid from "./_components/Grid/MainGrid";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css'; 
import { useAppDispatch, useAppSelector } from "./store/hooks";
import toast from "react-hot-toast";
import { setCodes, setColors, setShakers } from "./store/codesSlice";
import Confetti from "react-confetti";



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

export default function GameBoard() {
  const [row, setRow] = useState<number>(0)
  const codes = useAppSelector((state) => state.codes.codes);

  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const layout = {
    default: [
      'Q W E R T Y U I O P',
      'A S D F G H J L {enter}',
      'Z X C V B N M {bksp}'
    ],
  };

  const buttonTheme = [
    {
      class: "text-white font-semibold keyboard-bt-hover !w-12",
      buttons: "Q W E R T Y U I O P A S D F G H J K L Z X C V B N M {enter}",
    },
    {
      class: "!bg-keyboardCol1",
      buttons: "Q A Z",
    },
    {
      class: "!bg-keyboardCol2",
      buttons: "W S X",
    },
    {
      class: "!bg-keyboardCol3",
      buttons: "E D C"
    },
    {
      class: "!bg-keyboardCol4",
      buttons: "R F V",
    },
    {
      class: "!bg-keyboardCol5",
      buttons: "T G B",
    },
    {
      class: "!bg-keyboardCol6",
      buttons: "Y H N",
    },
    {
      class: "!bg-keyboardCol7",
      buttons: "U J M",
    },
    {
      class: "!bg-keyboardCol8",
      buttons: "I K",
    },
    {
      class: "!bg-keyboardCol9",
      buttons: "O L",
    },
    {
      class: "!bg-keyboardCol10",
      buttons: "P {bksp} {enter}",
    },
    {
      class: "text-white keyboard-bt-hover font-semibold",
      buttons: "{bksp}",
    }
  ];

  
  const handleKeyDown = useCallback(async (e: KeyboardEvent) => {
    const focusedElement = document.activeElement;
    const isNavbarLinkFocused = focusedElement?.id === 'home' || 
    focusedElement?.id === 'about' ||
    focusedElement?.id === 'homeMobile' || 
    focusedElement?.id === 'aboutMobile';
    
    if (e.key === 'Enter' && !isNavbarLinkFocused) {
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
            dispatch(setColors({ index: row, colors: newColors }))
            if (JSON.stringify(result.score) === JSON.stringify([2, 2, 2, 2, 2])){
              toast.success("You win!", {duration: 10000})
              setShowConfetti(true)
            }
            else if (row < 5 ){
              setRow(prev => prev+1)
            }
            else{
              toast.error("Nice try!", {duration: 5000})
            }
            
          }
          else {
            toast.error("Not a valid word.", {
              duration: 1000,
              
            });
            dispatch(setShakers({index: row, shakeStatus: true}))
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
  }, [codes, row])

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
   <div className="flex-none md:w-[500px] md:h-[650px] bg-white bg-opacity-30 py-5 rounded-2xl scroll-in-bottom" tabIndex={0}>
    {showConfetti && <Confetti numberOfPieces={200} recycle={false}/>}
      <WordleGrid />
      <div className="md:w-4/5 mt-4 mx-auto">
        <Keyboard layout={layout}
        theme={"hg-theme-default keyboard-bg"}
        display={{'{enter}': 'Enter','{bksp}': 'Backspace',}} 
        onKeyPress={(button) => handleKeyboardKeyPress(button)}
        buttonTheme={buttonTheme}
        disableButtonHold={true}
        />
      </div>
   </div>
  );
}
