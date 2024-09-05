import React, { useEffect } from 'react'
import { useAppSelector } from '@/app/store/hooks';
import gsap from 'gsap';



interface SubGridProps {
    rowIndex: number;
}

export default function SubGrid({ rowIndex }: SubGridProps) {


    const code = useAppSelector(state => state.codes.codes[rowIndex])
    const colors = useAppSelector(state => state.codes.colors[rowIndex])


    useEffect(() => {
 
            colors.forEach((color, index) => {
                if (color === 'bg-greenCircle') {
                    gsap.to(`#char-${rowIndex}-${index}`, {
                        y: -5,
                        duration: 0.2,
                        repeat: 5,
                        yoyo: true
                    });
                }
            });
    }, [colors]);

    return (
        <div className="flex justify-center pb-2">
            {colors.map((color, index) => (
                <div
                id={`char-${rowIndex}-${index}`}
                    key={index}
                    className={`mx-1 my-0 w-14 h-14 mx-2 md:w-16 md:h-16 flex items-center justify-center rounded-2xl  ${color}`}
                >
                    <span className="text-3xl font-semibold text-center text-white atext-keyboardCol5">{code[index] || ''}</span>
                </div>
            ))}
        </div>
    );
}