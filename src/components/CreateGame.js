import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
const API_URL = process.env.REACT_APP_API_URL;
const HEADERS = {
  headers: {
    'Authorization': window.localStorage.getItem('authToken'),
  },
};

const CreateRule = ({setView}) => {
  const [ruleList, setRuleList] = useState([]);

  useEffect(async ()=>{
    const rules = await axios.get(`${API_URL}rules`, HEADERS);
    setRuleList(rules.data.items);
  }, []);

  return (
    <div className='CreateRule'>
      {ruleList.map((rule) => (
        <div key={rule.name}>{rule.name}</div>
      ))}
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

export default CreateRule;
