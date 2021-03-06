import React, {useState} from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import RuleList from './RuleList';


const CreateGame = ({setView, setGameUri, setNotification}) => {
  const [selectedRule, setSelectedRule] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;
  const HEADERS = {
    headers: {
      'Authorization': window.localStorage.getItem('authToken'),
    },
  };

  const makeGame = async () => {
    const res = await axios.post(
        `${API_URL}games/`,
        {rule: selectedRule},
        HEADERS,
    );
    if (res.status===201) {
      console.log('res :>> ', res);
      setNotification('Created game');
      setGameUri(res.headers.location);
      res.headers.location ? setView('game') : null;
    }
  };

  return (
    <div className='CreateRule'>
      <h2>Select a rule set</h2>
      <RuleList setSelectedRule={setSelectedRule}/>
      <h2>{selectedRule} selected</h2>
      <Button
        variant='contained'
        style={{...playButtonStyle, backgroundColor: 'green'}}
        onClick={makeGame}
      >
        Create Game
      </Button><br/>
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
  paddingLeft: '50px',
  paddingRight: '50px',
  fontSize: '30px',
  marginTop: '50px',
};

export default CreateGame;
