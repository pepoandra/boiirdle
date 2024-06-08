import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
}

const KeyboardContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`;

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
  // @ts-ignore
  const keyboard = useRef<Keyboard | null>(null);

  const handleKeyPress = (button: string) => {
    onKeyPress(button);
    if (button === '{shift}' || button === '{lock}') handleShift();
  };

  const handleShift = () => {
    const currentKeyboard = keyboard.current;
    if (currentKeyboard) {
      const layoutName = currentKeyboard.options.layoutName;
      currentKeyboard.setOptions({
        layoutName: layoutName === 'default' ? 'shift' : 'default'
      });
    }
  };

  useEffect(() => {
    const handlePhysicalKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleKeyPress('{enter}');
      } else if (event.key === 'Backspace') {
        handleKeyPress('{bksp}');
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleKeyPress(event.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handlePhysicalKeyPress);

    return () => {
      window.removeEventListener('keydown', handlePhysicalKeyPress);
    };
  }, []);

  return (
    <KeyboardContainer>
      <Keyboard
        keyboardRef={(r: any) => (keyboard.current = r)}
        layoutName={'default'}
        onChange={() => {}}
        onKeyPress={handleKeyPress}
        layout={{
          default: [
            'Q W E R T Y U I O P',
            'A S D F G H J K L',
            'Z X C V B N M',
            '{bksp} {enter}'
          ]
        }}
        display={{
          '{bksp}': 'DEL',
          '{enter}': 'ENTER'
        }}
        physicalKeyboardHighlight={true}
        physicalKeyboardHighlightPress={true}
      />
    </KeyboardContainer>
  );
};

export default VirtualKeyboard;
