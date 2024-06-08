import React from 'react';
import styled from 'styled-components';
import Tile from './Tile';

interface BoardProps {
  guesses: string[];
  currentGuess: string;
  solution: string;
}

const BoardContainer = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, 40px);
  gap: 5px;
  justify-content: center;
  margin-top: 20px;
`;

const getTileStatuses = (guess: string, solution: string): ('correct' | 'misplaced' | 'absent' | 'other_misplaced')[] => {
  const solutionLetterCount: { [key: string]: number } = {};
  for (let i = 0; i < solution.length; i++) {
    solutionLetterCount[solution[i]] = (solutionLetterCount[solution[i]] || 0) + 1;
  }

  const statuses: ('correct' | 'misplaced' | 'absent' | 'other_misplaced')[] = Array(guess.length).fill('absent');
  const guessLetterCount: { [key: string]: number } = {};

  // First pass: mark all correct letters
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === solution[i]) {
      statuses[i] = 'correct';
      solutionLetterCount[guess[i]]--;
    }
  }

  // Second pass: mark misplaced and other misplaced letters
  for (let i = 0; i < guess.length; i++) {
    if (statuses[i] === 'correct') continue;

    if (solution.includes(guess[i]) && solutionLetterCount[guess[i]] > 0) {
      statuses[i] = 'misplaced';
      solutionLetterCount[guess[i]]--;
    } else if (solution.includes(guess[i])) {
      statuses[i] = 'other_misplaced';
    } else {
      statuses[i] = 'absent';
    }
  }

  return statuses;
};

const Board: React.FC<BoardProps> = ({ guesses, currentGuess, solution }) => {
  const rows = solution.length > 5 ? 8 : 5;

  console.log(guesses);
  return (
    <BoardContainer cols={solution.length}>
      {guesses.map((guess, rowIndex) => {
        const statuses = getTileStatuses(guess, solution);
        return guess.split('').map((letter, colIndex) => (
          <Tile
            key={`${rowIndex}-${colIndex}`}
            letter={letter}
            status={statuses[colIndex]}
          />
        ));
      })}
      {
        Array.from({ length: rows - guesses.length }).map((_, rowIndex) =>
          Array.from({ length: solution.length }).map((_, colIndex) => (
            <Tile
              key={`${rowIndex + guesses.length}-${colIndex}`}
              letter={rowIndex === 0 ? currentGuess[colIndex] || '' : ''}
              status='absent'
            />
          ))
        )
      }
    </BoardContainer>
  );
};

export default Board;
