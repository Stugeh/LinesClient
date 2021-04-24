import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Table, TableContainer, TableHead, TableBody, TableRow,
  TableCell, TextField, Paper,
} from '@material-ui/core';

import {useField} from '../hooks/formHook';

const API_URL = process.env.REACT_APP_API_URL;
const HEADERS = {
  headers: {
    'Authorization': window.localStorage.getItem('authToken'),
  },
};


const RuleList = ({}) => {
  // eslint-disable-next-line no-unused-vars
  const {reset: searchReset, ...search} = useField('text', 'search');
  const [ruleList, setRuleList] = useState([]);
  // const [selectedRule, setSelectedRule] =useState('');

  useEffect(async ()=>{
    const rules = await axios.get(`${API_URL}rules/`, HEADERS);
    setRuleList(rules.data.items);
  }, []);

  const filteredRules = filterByName(ruleList, search.value);

  //   const handleRadio = (event) => {
  //     setSelectedRule(event.target.value);
  //   };

  console.log(`selectedRule`, ruleList);
  return (
    <div style={{padding: '20px', margin: '0px'}}>
      <TextField {...search} />
      <TableContainer
        style={{
          width: '40%',
          marginLeft: 'auto',
          marginRight: 'auto',
          minWidth: '400px',
        }}
        component={Paper}
      >
        <Table aria-label="simple table">

          <TableHead>
            <TableRow >
              <TableCell>
                <h3>Name</h3>
              </TableCell>
              <TableCell>
                <h3 >Rows</h3>
              </TableCell>
              <TableCell>
                <h3>Columns</h3>
              </TableCell>
              <TableCell>
                <h3>Winning ticks</h3>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRules.map(((rule) => (
              <TableRow hover key={`${rule['@controls'].self.href}`}>
                <TableCell>
                  {rule.name}
                </TableCell>
                <TableCell>
                  {`${rule.rows}`}
                </TableCell>
                <TableCell>
                  {`${rule.columns}`}
                </TableCell>
                <TableCell>
                  {`${rule.winning_tick_count}`}
                </TableCell>
              </TableRow>
            )))}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
};

const filterByName = (games, search) => {
  const filtered = search === '' ? games :
    games.filter((rule) =>
      rule.name.toLowerCase().includes(search.toLowerCase()));
  return filtered;
};

export default RuleList;
