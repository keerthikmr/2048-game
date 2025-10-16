import { useState, useEffect } from "react";
import { startGame, makeMove } from "../api";

function Game() {
  const [board, setBoard] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [boardSize, setBoardSize] = useState<number | null>(null);
  const [showDpad, setShowDpad] = useState(true);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
    null
  );

  const tileColors = {
    2: "bg-yellow-100",
    4: "bg-yellow-200",
    8: "bg-yellow-300",
    16: "bg-yellow-400",
    32: "bg-yellow-500",
    64: "bg-yellow-600",
    128: "bg-yellow-700",
    256: "bg-yellow-800",
    512: "bg-yellow-900",
    1024: "bg-orange-500",
    2048: "bg-orange-700",
  };

  useEffect(() => {
    if (boardSize !== null) {
      initializeGame();
    }
  }, [boardSize]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameOver || gameWon || boardSize === null) return;

      const key = event.key.toLowerCase();

      if (["arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
        event.preventDefault();
      }

      switch (key) {
        case "arrowup":
        case "w":
          handleMove("up");
          break;
        case "arrowdown":
        case "s":
          handleMove("down");
          break;
        case "arrowleft":
        case "a":
          handleMove("left");
          break;
        case "arrowright":
        case "d":
          handleMove("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameOver, gameWon, boardSize, board]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    if (gameOver || gameWon) return;

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;
    const minSwipeDistance = 50;

    // Find if swipe is horizontal or vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          handleMove("left");
        } else {
          handleMove("right");
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) {
          handleMove("up");
        } else {
          handleMove("down");
        }
      }
    }
  };

  async function initializeGame() {
    const response = await startGame(boardSize!);
    setBoard(response.board);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
  }

  const handleMove = async (direction: string) => {
    if (gameOver || gameWon) return;

    const response = await makeMove("", direction, board);
    setBoard(response.board);
    setGameOver(response.game_over);
    setGameWon(response.game_won);

    if (response.valid_move) {
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1 sm:gap-2 overflow-hidden p-1 sm:p-2">
      {boardSize === null ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#FFFDD0] p-4 sm:p-6 rounded shadow-lg text-center max-w-sm mx-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Enter Board Size
            </h2>
            <input
              type="number"
              min="2"
              max="10"
              placeholder="Enter board size (e.g., 4)"
              className="
                border p-2 mb-3 sm:mb-4 w-full text-base sm:text-lg 
                [-moz-appearance:_textfield] 
                [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none 
                [&::-webkit-outer-spin-button]:m-0 
                [&::-webkit-inner-spin-button]:m-0
              "
              onChange={(e) => setBoardSize(Number(e.target.value))}
            />
            <button
              onClick={() => {
                if (boardSize && boardSize >= 2 && boardSize <= 10) {
                  initializeGame();
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded text-base sm:text-lg"
            >
              Start Game
            </button>
            <p className="text-sm sm:text-base text-gray-600 italic mt-2">
              Use WASD, Arrow Keys or the D-PAD to move tiles
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="shrink-0">
            <span className="text-sm sm:text-base md:text-lg font-bold">
              Score: {score}
            </span>
          </div>
          <div
            className="grid gap-1 sm:gap-1.5 md:gap-2 bg-[#ffba08] p-1 sm:p-1.5 md:p-2 rounded touch-none"
            style={{
              gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
              gridTemplateRows: `repeat(${boardSize}, 1fr)`,
              width: showDpad
                ? `min(85vw, calc(100vh - 20rem))`
                : `min(85vw, calc(100vh - 10rem))`,
              height: showDpad
                ? `min(85vw, calc(100vh - 20rem))`
                : `min(85vw, calc(100vh - 10rem))`,
              maxWidth: showDpad ? "500px" : "600px",
              maxHeight: showDpad ? "500px" : "600px",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {board.map((row, rowIndex) =>
              row.map((tile, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`flex items-center justify-center rounded font-bold text-black transition-all ${
                    tile
                      ? tileColors[tile as keyof typeof tileColors] ||
                        "bg-gray-400"
                      : "bg-[#F8DE7E]"
                  }`}
                  style={{
                    fontSize: `calc(${8 / boardSize}rem)`,
                    minHeight: 0,
                    minWidth: 0,
                  }}
                >
                  {tile || ""}
                </div>
              ))
            )}
          </div>
          {showDpad && (
            <div className="flex flex-col items-center shrink-0 mt-1 sm:mt-2">
              <button
                onClick={() => handleMove("up")}
                className="p-2 sm:p-3 bg-blue-500 text-white rounded-full mb-1 text-sm sm:text-base"
                disabled={gameOver || gameWon}
              >
                ▲
              </button>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  onClick={() => handleMove("left")}
                  className="p-2 sm:p-3 bg-blue-500 text-white rounded-full text-sm sm:text-base"
                  disabled={gameOver || gameWon}
                >
                  ◀
                </button>
                <div className="overflow-hidden w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbCoHINZgxndwjKISTAWPVVs3G79Pj7ppWdg&s"
                    alt="Center Icon"
                    className="w-10 h-10 sm:w-12 sm:h-12"
                  />
                </div>
                <button
                  onClick={() => handleMove("right")}
                  className="p-2 sm:p-3 bg-blue-500 text-white rounded-full text-sm sm:text-base"
                  disabled={gameOver || gameWon}
                >
                  ▶
                </button>
              </div>
              <button
                onClick={() => handleMove("down")}
                className="p-2 sm:p-3 bg-blue-500 text-white rounded-full mt-1 text-sm sm:text-base"
                disabled={gameOver || gameWon}
              >
                ▼
              </button>
            </div>
          )}
          <button
            onClick={() => setShowDpad(!showDpad)}
            className="absolute bottom-0 right-0 text-white !text-xs transition-all z-40"
            title={showDpad ? "Hide D-pad" : "Show D-pad"}
          >
            {showDpad ? "▼ Hide" : "▲ Show"}
          </button>
          {gameOver && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
              <div className="bg-white p-4 sm:p-6 rounded shadow-lg text-center max-w-sm mx-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  Game Over!
                </h2>
                <button
                  onClick={initializeGame}
                  className="px-4 py-2 bg-blue-500 text-white rounded text-base sm:text-lg"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
          {gameWon && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
              <div className="bg-white p-4 sm:p-6 rounded shadow-lg text-center max-w-sm mx-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  You Won!
                </h2>
                <button
                  onClick={initializeGame}
                  className="px-4 py-2 bg-blue-500 text-white rounded text-base sm:text-lg"
                >
                  Play Again
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
