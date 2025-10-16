import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen max-h-screen overflow-hidden px-2 sm:px-4 bg-[#FFE5B4] py-1 sm:py-2">
      <h1 className="text-[#8B8000] font-bold text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 shrink-0">
        2048 Game
      </h1>
      <div className="flex-1 w-full overflow-hidden flex items-center justify-center min-h-0">
        <Game />
      </div>
    </div>
  );
}

export default App;
