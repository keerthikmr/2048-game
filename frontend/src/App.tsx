import "./App.css";
import Game from "./components/game";

function App() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen h-100 px-5 bg-gray-100 gap-0">
      <h1 className="text-4xl font-bold h-1/5 flex items-center">2048 Game</h1>
      <div className="h-4/5 w-full">
        <Game />
      </div>
    </div>
  );
}

export default App;
