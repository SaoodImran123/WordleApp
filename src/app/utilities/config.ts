//toast configurations
export const TOAST_CONFIG = {
  SHORT: { duration: 1000 },
  MEDIUM: { duration: 5000 },
  LONG: { duration: 10000 },
};
//convert color names to tailwind classes
export const COLOR_CLASSES = {
  GRAY: "bg-grayCircle",
  ORANGE: "bg-orangeCircle",
  GREEN: "bg-greenCircle",
};
//winning score array
export const WINNING_SCORE = [2, 2, 2, 2, 2];

//function to check if user entered alphabet character
export const checkAlpha = (key: string) => /^[a-zA-Z]$/.test(key);

//used to convert virtual keyboard enter/backspace keys to real keyboard keys
export const translateKey = (key: string): string => {
  switch (key) {
    case "{enter}":
      return "Enter";
    case "{bksp}":
      return "Backspace";
    default:
      return key;
  }
};
//layout of virtual keyboard
export const layout = {
  default: [
    "Q W E R T Y U I O P",
    "A S D F G H J L {enter}",
    "Z X C V B N M {bksp}",
  ],
};
//theme of each button, such as colors for each column
export const buttonTheme = [
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
    buttons: "E D C",
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
  },
];
