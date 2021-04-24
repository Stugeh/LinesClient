import React from 'react';

import {Button, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {useField} from '../../hooks/formHook';

const GameSetup = ({setGameView}) => {
  const classes = useStyles();
  const {reset: rowsReset, ...rows} = useField('number', 'rows');
  const {reset: columnsReset, ...columns} = useField('number', 'columns');
  const {reset: ticksReset, ...ticks} = useField('number', 'ticks to win');

  const handleCreate = (event) => {
    event.preventDefault();
    // const rules = {
    //   rows: rows.value,
    //   columns: rows.value,
    //   winning_tick_count: rows.value,
    // };
    rowsReset();
    columnsReset();
    ticksReset();
  };
  return (
    <div className='gameSetup'>
      <h1 className='setupHeader'>Create new game</h1>
      <form className={classes.root} onSubmit={handleCreate}>
        <h3>Grid</h3>
        <TextField {...columns}/>
        <TextField {...rows}/>
        <h3>Ticks to win game</h3>
        <TextField {...ticks}/>
        <div>
          <Button
            type='submit'
            className='play'
            variant='contained'
            style={playButtonStyle}
            color='primary'
          >
            Create game
          </Button>
        </div>
      </form>
    </div>
  );
};

const playButtonStyle = {
  paddingTop: '0px',
  paddingBottom: '0px',
  paddingLeft: '50px',
  paddingRight: '50px',
  backgroundColor: 'green',
  fontSize: '20px',
  marginBottom: '30px',
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    }}}));

export default GameSetup;
