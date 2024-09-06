import React, { useCallback, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { setShakers } from '@/app/store/codesSlice';
import gsap from 'gsap';



interface SubGridProps {
    rowIndex: number;
}

export default function SubGrid({ rowIndex }: SubGridProps) {
    const dispatch = useAppDispatch()

    const code = useAppSelector(state => state.codes.codes[rowIndex])
    const colors = useAppSelector(state => state.codes.colors[rowIndex])
    const shakeStatus = useAppSelector(state => state.codes.shakers[rowIndex])

    const resetShakeStatus = useCallback(() => {
        dispatch(setShakers({ index: rowIndex, shakeStatus: false }));
      }, [dispatch, rowIndex]);
    
      useEffect(() => {
        if (shakeStatus === true) {
          gsap.to(`#row-${rowIndex}`, {
            keyframes: [
              { x: -10, duration: 0.1 },
              { x: 10, duration: 0.1 },
              { x: -10, duration: 0.1 },
              { x: 10, duration: 0.1 },
              { x: 0, duration: 0.1 },
            ],
          });
          resetShakeStatus();
        }
      }, [shakeStatus, rowIndex, resetShakeStatus]); 

      useEffect(() => {
        colors.forEach((color, index) => {
          if (color === 'bg-greenCircle') {
            gsap.to(`#char-${rowIndex}-${index}`, {
              y: -5,
              duration: 0.2,
              repeat: 5,
              yoyo: true,
            });
          }
        });
      }, [colors, rowIndex]); 

    return (
        <div className="flex justify-center pb-2" id={`row-${rowIndex}`}>
            {colors.map((color, index) => (
                <div
                    id={`char-${rowIndex}-${index}`}
                    aria-describedby='character input'
                    key={index}
                    className={`mx-1 my-0 w-14 h-14 mx-2 md:w-16 md:h-16 flex items-center justify-center rounded-2xl  ${color}`}
                >
                    <span className="text-3xl font-semibold text-center text-white atext-keyboardCol5">{code[index] || ''}</span>
                </div>
            ))}
        </div>
    );
}