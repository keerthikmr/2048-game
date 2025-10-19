import "./App.css";
import Game from "./components/Game";
import { useState } from "react";
import { Analytics } from "@vercel/analytics/next";

function App() {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="flex flex-col items-center min-h-screen max-h-screen overflow-hidden px-2 sm:px-4 bg-[#FFE5B4] py-1 sm:py-2">
      <h1 className="text-[#8B8000] font-bold text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 shrink-0">
        2048 Game
      </h1>
      <div className="absolute top-2 right-2">
        <button
          onClick={() => setShowOptions(true)}
          className="px-3 py-1 bg-gray-700 text-white rounded text-sm sm:text-base"
        >
          Options
        </button>
      </div>
      <div className="flex-1 w-full overflow-hidden flex items-center justify-center min-h-0 relative">
        <Game showOptions={showOptions} setShowOptions={setShowOptions} />
      </div>
      <Analytics />
    </div>
  );
}

export default App;
