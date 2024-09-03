'use client'
import React, { useState } from 'react'
import SubGrid from './SubGrid';

type Props = {}

export default function WordleGrid({ }: Props) {
  const ROWS = 6;
  const idx = Array.from({ length: ROWS }, (_, index) => index)

  return (
    <div className='flex justify-center flex-col'>
      {idx.map((index) => (
        <SubGrid key={index} rowIndex={index}></SubGrid>
      ))}
    </div>
  )
}