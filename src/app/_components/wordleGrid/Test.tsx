import React, { useEffect, forwardRef, ref, useState } from 'react'
import OTPInput, { InputProps } from 'react-otp-input';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setActiveRow } from '@/app/store/rowSlice';
import { RootState } from '@/app/store/store';
import { current } from '@reduxjs/toolkit';

interface SubGridProps {
    rowIndex: number;
}
const colorMap = ['bg-grayCircle', 'bg-orangeCircle', 'bg-greenCircle']
const checkAlpha = (key: string) => /^[a-zA-Z]$/.test(key)

const Test = forwardRef<HTMLDivElement, SubGridProps>(function SubGrid({ rowIndex }: SubGridProps, ref) {
    const [code, setCode] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [isLocked, setIsLocked] = useState<boolean>(true)
    const [colors, setColors] = useState<string[]>(new Array(5).fill(('bg-emptyCircle')));
    const [currentInput, setCurrentInput] = useState<number>(0); 

    const dispatch = useAppDispatch()
    const currentActiveRow = useAppSelector((state: RootState) => state.activeRow.currentRow)

    
    useEffect(() => {
        if (rowIndex == currentActiveRow) {
            setIsLocked(false)

        } else (
            setIsLocked(true)
        )
    }, [currentActiveRow])

    const handleChange = (code: string) => setCode(code.toUpperCase())

    const  handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isLocked == false){
            if (e.key === 'Enter') {
                if (code.length < 5) {
                    setError('Not enough letters')
                } else {
                    setError(null);
                    try {
                        const response = await fetch('https://wordle-apis.vercel.app/api/validate', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ guess: code })
                        })
                        if (!response.ok) {
                            throw new Error('Network response error');
                          }
                        const result = await response.json()
                        if (result.is_valid_word == true) {
                            const newColors = result.score.map((score: number) => colorMap[score])
                            console.log(newColors)
                            setColors(newColors)
                            dispatch(setActiveRow(currentActiveRow + 1))
                        }
                    }
                    catch (error) {
                        console.log("Error in handle key down")
                    }
                            
                }
            }
            else if (checkAlpha(e.key)){
                if (code.length < 5){
                    handleChange(code + e.key)
                }


            }
            else if (e.key === 'Backspace'){
                e.preventDefault()
                handleChange(code.slice(0,-1))
            }
        }
    }
    return (
        <div className='flex justify-center pb-5'
        onKeyDown={handleKeyDown}
        tabIndex={0}
        ref={ref}>
            <OTPInput
                value={code}
                onChange={handleChange}
                numInputs={5}
                renderSeparator={<span className='w-4 md:w-4'> </span>}
                renderInput={(props: InputProps, index: number) => (
                    <input {...props}
                        className={`w-12 h-12 md:w-16 md:h-16 text-center border border-gray-400 rounded rounded-full outline-none ${colors[index]}`}
                        disabled={isLocked}
                        key={index}
                        readOnly
                         />

                )}
                skipDefaultStyles={true}
                shouldAutoFocus={true}
            />
            {error && <div className="text-red-500 mt-2">{error}</div>} {/* Display error message */}
        </div>
    )
})
export default Test