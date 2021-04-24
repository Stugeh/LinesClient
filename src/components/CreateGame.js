import React from 'react';
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
  return (
    <div className='CreateRule'>
      <RuleList/>
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
