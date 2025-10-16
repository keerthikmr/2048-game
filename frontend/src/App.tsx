import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen max-h-screen overflow-hidden px-2 sm:px-5 bg-[#FFE5B4] py-2 sm:py-4">
      <h1 className="text-[#8B8000] font-bold text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-4 shrink-0">
        2048 Game
      </h1>
      <div className="flex-1 w-full overflow-hidden flex items-center justify-center min-h-0">
        <Game />
      </div>
    </div>
  );
}

export default App;
