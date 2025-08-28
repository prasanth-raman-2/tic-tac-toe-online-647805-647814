import React, { useState, useCallback } from 'react';

// PUBLIC_INTERFACE
const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameHistory, setGameHistory] = useState(null);

  const calculateWinner = useCallback((squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }, []);

  const handleClick = useCallback((index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
      setGameHistory(`${winner} won the last game!`);
    } else if (!newBoard.includes(null)) {
      setGameHistory("Last game was a draw!");
    }

    setIsXNext(!isXNext);
  }, [board, isXNext, calculateWinner]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }, []);

  const resetScores = useCallback(() => {
    setScores({ X: 0, O: 0 });
    setGameHistory(null);
    resetGame();
  }, [resetGame]);

  const winner = calculateWinner(board);
  const status = winner 
    ? `Winner: ${winner}`
    : board.every(cell => cell)
    ? "Game is a draw!"
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">Tic Tac Toe</h1>
        <div className="score-board">
          <div className="score-card">
            <h2>Player X</h2>
            <p>{scores.X}</p>
          </div>
          <div className="score-card">
            <h2>Player O</h2>
            <p>{scores.O}</p>
          </div>
        </div>
      </div>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell || ''}`}
            onClick={() => handleClick(index)}
            disabled={!!cell || !!winner}
            aria-label={`Cell ${index + 1}`}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="game-status">{status}</div>
      {gameHistory && <div className="game-status">{gameHistory}</div>}

      <div className="game-controls">
        <button className="btn btn-primary" onClick={resetGame}>
          New Game
        </button>
        <button className="btn btn-secondary" onClick={resetScores}>
          Reset Scores
        </button>
      </div>
    </div>
  );
};

export default Game;
