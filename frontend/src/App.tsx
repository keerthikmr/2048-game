import "./App.css";
import Game from "./components/game";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">2048 Game</h1>
      <Game />
    </div>
  );
}

export default App;
