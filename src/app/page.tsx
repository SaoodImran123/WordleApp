import Image from "next/image";
import WordleGrid from "./_components/wordleGrid/WordleGrid";
export default function Home() {
  return (
   <div className="h-full">
      <WordleGrid />
   </div>
  );
}
