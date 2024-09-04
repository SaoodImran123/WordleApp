import React from 'react'
import { useAppSelector } from '@/app/store/hooks';



interface SubGridProps {
    rowIndex: number;
}

export default function SubGrid({ rowIndex }: SubGridProps) {


    const code = useAppSelector(state => state.codes.codes[rowIndex])
    const colors = useAppSelector(state => state.codes.colors[rowIndex])

 

    return (
        <div className="flex justify-center pb-5">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className={`w-12 h-12 mx-2 md:w-16 md:h-16 flex items-center justify-center border border-gray-400 rounded-full ${color}`}
                >
                    <span className="text-center">{code[index] || ''}</span>
                </div>
            ))}
        </div>
    );
}