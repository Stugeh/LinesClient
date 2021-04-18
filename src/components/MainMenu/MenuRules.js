import React from 'react';
import {Paper, Divider} from '@material-ui/core';

const SinglePlayerRules = () => (
  <ol>
    <li>Player is shown a grid that hides a picture underneath.</li>
    <li>
      The players objective is to guess what the object in the photo is.
      They do this by typing in words into the chat box on the left of the
      screen.
    </li>
    <li>Periodically tiles are removed revealing more of the picture.</li>
  </ol>
);

const MultiPlayerRules = () => (
  <ol>
    <li>
      One person gets shown a list of words while other players look away.
    </li>
    <li>
      That person then draws the word while other players attempt to guess it.
    </li>
    <li>
      when the correct word is guessed the drawer clicks the correct button next
      to the guessers name.
    </li>
  </ol>
);

const MenuRules = ({activeMode}) => {
  const paperStyle ={
    width: '30%',
    marginLeft: '35%',
    marginTop: '10px',
  };

  return (
    <Paper elevation={24} variant='outlined' style={paperStyle}>
      <h3>{activeMode.toUpperCase()}</h3>
      <Divider />
      {activeMode === 'singlePlayer' ? <SinglePlayerRules/> : <></>}
      {activeMode === 'multiPlayer' ? <MultiPlayerRules/> : <></>}
    </Paper>
  );
};

export default MenuRules;
