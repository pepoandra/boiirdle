import React, { useEffect } from 'react';
import styled from 'styled-components';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

interface CustomKeyboardProps {
  onKeyPress: (key: string) => void;
  absentLetters: Set<string>;
}

const KeyboardContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`;

const AbsentKey = styled.div`
  background-color: #d3d3d3 !important; /* Light gray */
  color: #000000 !important; /* Black text */
`;

const CustomKeyboard: React.FC<CustomKeyboardProps> = ({ onKeyPress, absentLetters }) => {
  const handleKeyPress = (button: string) => {
    if (button === '{enter}') {
      onKeyPress('ENTER');
    } else if (button === '{bksp}') {
      onKeyPress('DEL');
    } else if (/^[a-zA-Z]$/.test(button)) {
      onKeyPress(button.toUpperCase());
    }
  };

  useEffect(() => {
    const handlePhysicalKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onKeyPress('ENTER');
      } else if (event.key === 'Backspace') {
        onKeyPress('DEL');
      } else if (/^[a-zA-Z]$/.test(event.key) && !event.getModifierState('CapsLock')) {
        onKeyPress(event.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handlePhysicalKeyPress);

    return () => {
      window.removeEventListener('keydown', handlePhysicalKeyPress);
    };
  }, [onKeyPress]);

  const getButtonTheme = () => {
    const absentButtonTheme = Array.from(absentLetters).map(letter => ({
      class: 'absent',
      buttons: letter.toUpperCase(),
    }));
    return absentButtonTheme;
  };

  return (
    <KeyboardContainer>
      <style>
        {`
          .absent {
            background-color: #d3d3d3 !important;
            color: #000000 !important;
          }
        `}
      </style>
      <Keyboard
        onKeyPress={handleKeyPress}
        layout={{
          default: [
            'Q W E R T Y U I O P',
            'A S D F G H J K L',
            'Z X C V B O I I N M',
            '{bksp} {enter}'
          ]
        }}
        display={{
          '{bksp}': 'DEL',
          '{enter}': 'ENTER'
        }}
        buttonTheme={getButtonTheme()}
        physicalKeyboardHighlight={true}
        physicalKeyboardHighlightPress={true}
      />
    </KeyboardContainer>
  );
};

export default CustomKeyboard;
