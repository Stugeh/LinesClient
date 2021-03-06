/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import {Button, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {useField} from '../hooks/formHook';
import MainMenu from './MainMenu/MainMenu';


const CreateRule = ({setView, setNotification}) => {
  const {reset: rowsReset, ...rows} = useField('number', 'rows');
  const {reset: columnsReset, ...columns} = useField('number', 'columns');
  const {reset: ticksReset, ...ticks} = useField('number', 'ticks to win');
  const {reset: nameReset, ...name} = useField('text', 'rule set name');
  const classes = useStyles();

  const API_URL = process.env.REACT_APP_API_URL;
  const HEADERS = {
    headers: {
      'Authorization': window.localStorage.getItem('authToken'),
    },
  };

  // Makes new rule set in the database
  const handleCreate = async (event) => {
    event.preventDefault();
    const rules = {
      rows: rows.value,
      columns: columns.value,
      winning_tick_count: ticks.value,
      name: name.value,
    };
    const ruleRes = await axios
        .post(`${API_URL}rules/`, rules, HEADERS);
    console.log('res.headers :>> ', ruleRes.headers);
    if (ruleRes.status===201) {
      setNotification({open: true, message: 'Ruleset created!'});
      setView('mainMenu');
    }
  };

  return (
    <div className='gameSetup'>
      <h1 className='setupHeader'>Create new Rule set</h1>
      <form className={classes.root} onSubmit={handleCreate}>
        <h3>Name</h3>
        <TextField {...name}/>
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
            Create Rule set
          </Button>
        </div>
      </form>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => {
          setView('mainMenu');
        }}>
         Back
      </Button>
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

export default CreateRule;
