import { useState, useEffect } from "react";
import { startGame, makeMove } from "../api";

function Game() {
  const [board, setBoard] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [boardSize, setBoardSize] = useState<number | null>(null);

  useEffect(() => {
    if (boardSize !== null) {
      initializeGame();
    }
  }, [boardSize]);

  async function initializeGame() {
    const response = await startGame(boardSize!);
    setBoard(response.board);
    setScore(0);
    setGameOver(false);
  }

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
      {boardSize === null ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Enter Board Size</h2>
            <input
              type="number"
              min="2"
              max="10"
              placeholder="Enter board size (e.g., 4)"
              className="border p-2 rounded mb-4 w-full"
              onChange={(e) => setBoardSize(Number(e.target.value))}
            />
            <button
              onClick={() => {
                if (boardSize && boardSize >= 2 && boardSize <= 10) {
                  initializeGame();
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Start Game
            </button>
          </div>
        </div>
      ) : (
        <>
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
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
                <p className="mb-4">Final Score: {score}</p>
                <button
                  onClick={initializeGame}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Restart Game
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Game;
