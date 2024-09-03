import React, { useEffect, useState } from 'react'
import OTPInput, { InputProps } from 'react-otp-input';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setActiveRow } from '@/app/store/rowSlice';
import { RootState } from '@/app/store/store';

interface SubGridProps {
    rowIndex: number;
}
const colorMap = ['bg-grayCircle', 'bg-orangeCircle', 'bg-greenCircle']

export default function SubGrid({ rowIndex }: SubGridProps) {
    const [code, setCode] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [isLocked, setIsLocked] = useState<boolean>(true)
    const [colors, setColors] = useState<string[]>(new Array(5).fill(('bg-emptyCircle')));
    const dispatch = useAppDispatch()
    const currentActiveRow = useAppSelector((state: RootState) => state.activeRow.currentRow)

    useEffect(() => {
        if (rowIndex == currentActiveRow) {
            setIsLocked(false)
        } else (
            setIsLocked(true)
        )
    }, [currentActiveRow])

    const handleChange = (code: string) => setCode(code)

    const  handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    }
    return (
        <div className='flex justify-center pb-5'
        onKeyDown={handleKeyDown}
        tabIndex={0}>
            <OTPInput
                value={code}
                onChange={handleChange}
                numInputs={5}
                renderSeparator={<span className='w-4 md:w-4'> </span>}
                renderInput={(props: InputProps, index: number) => (
                    <input {...props}
                        className={`w-12 h-12 md:w-16 md:h-16 text-center border border-gray-400 rounded rounded-full ${colors[index]}`}
                        disabled={isLocked}
                        //onKeyDown={handleKeyDown}
                         />

                )}
                skipDefaultStyles={true}
            />
            {error && <div className="text-red-500 mt-2">{error}</div>} {/* Display error message */}
        </div>
    )
}