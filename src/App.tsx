import React, {useState} from 'react';
import styled from 'styled-components';
import Banner from './components/Banner';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import Notification from './components/Notification';
import {GlobalStyles} from './styles/globalStyles';
import {words} from './utils/words';
import axios from 'axios';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const ResetButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const App: React.FC = () => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [notification, setNotification] = useState<string>('');
  const [solution, setSolution] = useState<string>(words[Math.floor(Math.random() * words.length)]);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [absentLetters, setAbsentLetters] = useState<Set<string>>(new Set());


const checkWordExists = async (word: string) => {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

const handleKeyPress = async (key: string) => {
  if (isBlocked) return; // Block input if user is in timeout

  const rows = solution.length > 5 ? 8 : 5;
  if (guesses.length >= rows) {
    return; // No more input allowed after the limit is reached
  }
  if (key === 'ENTER') {
    if (currentGuess.length === solution.length) {
      let newNotification = '';
      if (currentGuess === solution) {
        newNotification = 'BOIII';
        // only add the guess if its not already in the guesses array
        if (!guesses.includes(currentGuess)) {
          setGuesses([...guesses, currentGuess]);
          setCurrentGuess('');
        }
      } else {
        if (guesses.includes(currentGuess)) {
          newNotification = 'REPOST!!!';
          setIsBlocked(true); // Block input
          setTimeout(() => setIsBlocked(false), 60000); // Unblock after 1 minute
          setGuesses([...guesses, currentGuess]);
          setCurrentGuess('');
        } else {
          const isValidWord = await checkWordExists(currentGuess);
          if (!isValidWord) {
            newNotification = 'INVALID WORD!!!';
            setCurrentGuess('');
          } else {
            //  create an array of possible "nope" like answers and choose one randomly
            const nope = ['NOPE', 'WRONG', 'TRY AGAIN'];
            newNotification = nope[Math.floor(Math.random() * nope.length)];

            setGuesses([...guesses, currentGuess]);
            setCurrentGuess('');

            const currentGuessLetters = new Set(currentGuess);
            const newAbsentLetters = new Set(absentLetters);
            currentGuessLetters.forEach(letter => {
              if (!solution.includes(letter)) {
                newAbsentLetters.add(letter);
              }
            });
            setAbsentLetters(newAbsentLetters);
          }
        }
        if (guesses.length + 1 >= (solution.length > 5 ? 8 : 5)) {
          newNotification = `${newNotification}, UNBOII. The word was ${solution}`;
        }
      }
      setNotification(newNotification);
    }
  } else if (key === 'DEL') {
    setCurrentGuess(currentGuess.slice(0, -1));
    setNotification('');
  } else if (currentGuess.length < solution.length) {
    setCurrentGuess((prev) => prev + key);
    setNotification('');
  }
};



  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess('');
    setNotification('');
    setAbsentLetters(new Set()); // Reset absent letters
    setSolution(words[Math.floor(Math.random() * words.length)]);
    (document.activeElement as HTMLElement).blur(); // This will remove focus from the reset button
  };

  return (
    <AppContainer>
      <GlobalStyles />
      <Banner />
      <Board guesses={guesses} currentGuess={currentGuess} solution={solution} />
      <Keyboard onKeyPress={handleKeyPress} absentLetters={absentLetters} />
      <Notification message={notification} />
      <ResetButton onClick={resetGame}>Reset Game</ResetButton>
    </AppContainer>
  );
};

export default App;
