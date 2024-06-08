import React from 'react';
import styled from 'styled-components';
import Tile from './ScrabbleTile';

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Banner: React.FC = () => {
  const title = 'BOIIRDLE';

  return (
    <BannerContainer>
      {title.split('').map((char, index) => (
        <Tile key={index} letter={char} />
      ))}
    </BannerContainer>
  );
};

export default Banner;
