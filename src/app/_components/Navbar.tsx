'use client'
import React, { useState } from 'react'
type Props = {}

const Navbar = (props: Props) => {
    const [isClicked, setisClicked] = useState(false)
    const toggleNav = () => {
        setisClicked(prev => !prev)
    }

    return (
        <>
            <nav className='bg-emptyCircle text-textColor'>
                <div className='mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16'>
                        <div className=''>
                        <a href='/' className=''>
                                    Logo
                                </a>
                        </div>
                        <div className='md:absolute md:left-1/2 md:transform md:-translate-x-1/2 text-4xl font-semibold'>
                            Wordle App
                        </div>
                        <div className='hidden md:block'>
                            <div className='space-x-4'>
                                <a href='/' className='hover:bg-white hover:text-black rounded-lg p-2'>
                                    Home
                                </a>
                                <a href='/' className=' hover:bg-white hover:text-black rounded-lg p-2'>
                                    About
                                </a>
                            </div>

                        </div>
                        <div className='md:hidden flex items-center'>
                            <button className='inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white' onClick={toggleNav}>
                                {isClicked ? (<svg className="h-6 w-6"

                                    xmlns="http://www.w3.org/2000/svg"

                                    fill="none"

                                    viewBox="0 0 24 24"

                                    stroke="currentColor" >

                                    <path

                                        strokeLinecap="round"

                                        strokeLinejoin="round"

                                        strokeWidth={2}

                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                ) :
                                    (<svg className="h-6 w-6"

                                        xmlns="http://www.w3.org/2000/svg"

                                        fill="none"

                                        viewBox="0 0 24 24"

                                        stroke="currentColor">

                                        <path

                                            strokeLinecap="round"

                                            strokeLinejoin="round"

                                            strokeWidth={2}

                                            d="M4 6h16M4 12h16m-7 6h7" />

                                    </svg>)}
                            </button>
                        </div>
                    </div>
                </div>
                {isClicked && (
                    <div className='md:hidden'>
                        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                            <a href='/' className='text-white block hover:bg-white hover:text-black rounded-lg p-2'>
                                Home
                            </a>
                            <a href='/' className='text-white block hover:bg-white hover:text-black rounded-lg p-2'>
                                About
                            </a>

                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Navbar