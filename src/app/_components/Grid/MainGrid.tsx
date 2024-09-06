'use client'
import React from 'react'
import SubGrid from './SubGrid';
import {useAppSelector } from '@/app/store/hooks';
type Props = {}


export default function WordleGrid({ }: Props) {
  const codes = useAppSelector((state) => state.codes.codes);



  return (
    <div className='flex justify-center flex-col'>
      {codes.map((code, index) => (
        <SubGrid key={index} rowIndex={index}></SubGrid>
      ))}
    </div>
  )
}