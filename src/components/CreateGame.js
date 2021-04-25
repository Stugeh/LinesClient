import React, {useState} from 'react';
// import axios from 'axios';
import {Button} from '@material-ui/core';
import RuleList from './RuleList';
// const API_URL = process.env.REACT_APP_API_URL;
// const HEADERS = {
//   headers: {
//     'Authorization': window.localStorage.getItem('authToken'),
//   },
// };

const CreateGame = ({setView}) => {
  const [selectedRule, setSelectedRule] = useState('');
  return (
    <div className='CreateRule'>
      <h2>Select a rule set</h2>
      <RuleList setSelectedRule={setSelectedRule}/>
      <h2>{selectedRule} selected</h2>
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

export default CreateGame;
