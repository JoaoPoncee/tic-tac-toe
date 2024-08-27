"use client";

import { ConfettiStars } from "@/components/magicui/confetti";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Square({
  value,
  onSquareClick,
}: {
  value: string;
  onSquareClick: () => void;
}) {
  return (
    <button
      className="text-muted-foreground bg-background size-16 border text-3xl"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner + " 🥳";
  } else if (squares.every((square) => square !== null)) {
    status = "Tie"
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function restartGame() {
    window.location.reload();
  }

  return (
    <>
      <div className="flex justify-center flex-col items-center h-screen">
        <div>
          <div className="flex justify-center text-1xl text-foreground">
            {winner ? <ConfettiStars text={status} /> : <p className="text-lg p-2">{status}</p>}
          </div>

          <div className="flex w-full">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="flex w-full">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="flex w-full">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
          <div className="flex justify-center my-3">
            <Button
              variant={"secondary"}
              className="rounded"
              onClick={restartGame}
            >
              Restart Game
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  function calculateWinner(squares: any[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
}
