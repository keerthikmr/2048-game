import { useState, useEffect } from "react";
import { startGame, makeMove } from "../api";

const BOARD_SIZE = 4;

function Game() {
  const [board, setBoard] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    async function initializeGame() {
      const response = await startGame(BOARD_SIZE);
      setBoard(response.board);
    }
    initializeGame();
  }, []);

  const handleMove = async (direction: string) => {
    if (gameOver) return;

    const response = await makeMove("", direction, board);
    setBoard(response.board);
    setGameOver(response.game_over);

    if (response.valid_move) {
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <span className="text-xl font-bold">Score: {score}</span>
      </div>
      <div className="grid grid-cols-4 gap-2 bg-gray-300 p-4 rounded">
        {board.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`flex items-center justify-center w-16 h-16 bg-gray-200 text-xl font-bold ${
                tile > 0 ? "bg-yellow-400" : "bg-gray-200"
              }`}
            >
              {tile > 0 ? tile : ""}
            </div>
          ))
        )}
      </div>
      <div className="flex mt-4 space-x-2">
        <button
          onClick={() => handleMove("up")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Up
        </button>
        <button
          onClick={() => handleMove("left")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Left
        </button>
        <button
          onClick={() => handleMove("down")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Down
        </button>
        <button
          onClick={() => handleMove("right")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Right
        </button>
      </div>
      {gameOver && (
        <div className="mt-4 text-red-500 text-xl font-bold">
          Game Over! Final Score: {score}
        </div>
      )}
    </div>
  );
}

export default Game;
