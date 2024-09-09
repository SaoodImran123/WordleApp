"use client";
import React from "react";
import SubGrid from "./SubGrid";
import { useAppSelector } from "@/app/store/hooks";

export default function MainGrid() {
  //retrieving codes to use its size for iteration (six tries)
  const codes = useAppSelector((state) => state.codes.codes);

  return (
    <div className="maingrid-container">
      {codes.map((code, index) => (
        <SubGrid key={index} rowIndex={index}></SubGrid>
      ))}
    </div>
  );
}
