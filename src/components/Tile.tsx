import React from 'react';
import styled from 'styled-components';

interface TileProps {
  letter: string;
  status: 'correct' | 'misplaced' | 'absent' | 'other_misplaced';
}

const TileContainer = styled.div<{ status: 'correct' | 'misplaced' | 'absent' | 'other_misplaced' }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  background-color: ${(props) =>
    props.status === 'correct' ? '#4CAF50' :
    props.status === 'misplaced' ? '#FFD700' :
    props.status === 'other_misplaced' ? '#D3D3D3' : '#D3D3D3'};
  color: ${(props) => (props.status === 'misplaced' ? 'black' : 'white')};
  font-size: 1.5rem;
  font-weight: bold;
`;

const Tile: React.FC<TileProps> = ({ letter, status }) => {
  return <TileContainer status={status}>{letter}</TileContainer>;
};

export default Tile;
