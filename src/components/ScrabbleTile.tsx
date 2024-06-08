import React from 'react';
import styled from 'styled-components';

interface TileProps {
  letter: string;
}

const TileContainer = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  background-color: #f9f9f9;
  border: 2px solid #ccc;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
`;

const Tile: React.FC<TileProps> = ({ letter }) => {
  return <TileContainer>{letter}</TileContainer>;
};

export default Tile;
