import React, { useCallback, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setShakers } from "@/app/store/codesSlice";
import gsap from "gsap";
import { SubGridProps } from "@/app/utilities/interfaces";

export default React.memo(function SubGrid({ rowIndex }: SubGridProps) {
  const dispatch = useAppDispatch();
  //maintains the user inputted text of the current active row
  const code = useAppSelector((state) => state.codes.codes[rowIndex]);
  //maintains the colors of the subgrid row tiles
  const colors = useAppSelector((state) => state.codes.colors[rowIndex]);
  //maintains the shake status of the subgrid
  const shakeStatus = useAppSelector((state) => state.codes.shakers[rowIndex]);
  //keeps track of the currently active row
  const activeRow = useAppSelector((state) => state.codes.currentRow);
  //keeps track of if the game is over yet or not
  const gameOver = useAppSelector((state) => state.codes.gameOver);

  //callback for resetting shake status, improves performance so function is not recreated needlessly
  const resetShakeStatus = useCallback(() => {
    dispatch(setShakers({ index: rowIndex, shakeStatus: false }));
  }, [dispatch, rowIndex]);

  //use effect shakes row if row needs to be shaken (incorrect input) then resets its status
  useEffect(() => {
    if (shakeStatus) {
      gsap
        .to(`#row-${rowIndex}`, {
          keyframes: [
            { x: -10, duration: 0.1 },
            { x: 10, duration: 0.1 },
            { x: -10, duration: 0.1 },
            { x: 10, duration: 0.1 },
            { x: 0, duration: 0.1 },
          ],
        })
        .then(resetShakeStatus);
    }
  }, [shakeStatus, rowIndex, resetShakeStatus]);

  //bounces the green tiles to indicate good progress
  useEffect(() => {
    //determines which row to bounce. If the game is not won, should be previous row, if won, then current row
    const rowToBounce = gameOver ? rowIndex : rowIndex + 1;
    if (activeRow == rowToBounce) {
      //for each green tile, make it bounce
      colors.forEach((color, index) => {
        if (color === "bg-greenCircle") {
          gsap.to(`#char-${rowIndex}-${index}`, {
            y: -5,
            duration: 0.2,
            repeat: 5,
            yoyo: true,
          });
        }
      });
    }
  }, [colors, rowIndex, activeRow, gameOver]);

  return (
    <div className="subgrid-row" id={`row-${rowIndex}`}>
      {colors.map((color, index) => (
        <div
          id={`char-${rowIndex}-${index}`}
          key={index}
          className={`subgrid-box ${color} ${
            ((index === 4 && code.length === 5) || code.length === index) &&
            rowIndex === activeRow
              ? "border border-2"
              : ""
          }`}
          aria-describedby={`desc-${rowIndex}-${index}`}
        >
          <span
            id={`desc-${rowIndex}-${index}`}
            className="subgrid-box-text"
          >
            {code[index] || ""}
          </span>
        </div>
      ))}
    </div>
  );
});
