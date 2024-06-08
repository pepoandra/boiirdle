declare module 'react-scrabble' {
  import * as React from 'react';

  export interface TitleProps {
    letter: string;
  }

  export class Title extends React.Component<TitleProps> {}
}
