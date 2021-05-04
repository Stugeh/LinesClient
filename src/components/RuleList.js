import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {DataGrid} from '@material-ui/data-grid';
import {TextField} from '@material-ui/core';
import {useField} from '../hooks/formHook';

const API_URL = process.env.REACT_APP_API_URL;
const HEADERS = {
  headers: {
    'Authorization': window.localStorage.getItem('authToken'),
  },
};


const RuleList = ({setSelectedRule}) => {
  // eslint-disable-next-line no-unused-vars
  const {reset: searchReset, ...search} = useField('text', 'search');
  const [ruleList, setRuleList] = useState([]);

  // Fetches the rule list when this component is mounted
  useEffect(async ()=>{
    const rules = await axios.get(`${API_URL}rules/`, HEADERS);
    setRuleList(rules.data.items);
  }, []);

  const filteredRules = filterByName(ruleList, search.value);

  // Changes the selected rule set when creating a game
  const selectionChange = (selection) => {
    setSelectedRule(selection.data.name);
  };

  return (
    <div style={{height: 500, width: '80%', paddingBottom: '10px'}}>
      <TextField {...search}/>
      <DataGrid
        density='compact'
        rows={parseRows(filteredRules)}
        columns={tableColumns}
        pageSize={100}
        hideFooterPagination
        hideFooterSelectedRowCount
        onRowSelected={selectionChange}
      />
    </div>
  );
};

// Columns headers for the rule list table
const tableColumns = [
  {field: 'name', headerName: 'Name', width: 130},
  {field: 'rows', headerName: 'Rows', width: 200},
  {field: 'columns', headerName: 'Columns', width: 200},
  {field: 'ticks', headerName: 'Winning ticks', width: 250},
];

// creates rows for the rule list table
const parseRows = (rules) => {
  const data = rules.map((rule) => (
    {
      name: rule.name,
      rows: rule.rows,
      columns: rule.columns,
      ticks: rule.winning_tick_count,
      id: rule['@controls'].self.href,
    }));
  return data;
};

// Filters rules by rule set name
const filterByName = (games, search) => {
  const filtered = search === '' ? games :
  games.filter((rule) =>
    rule.name.toLowerCase().includes(search.toLowerCase()));
  return filtered;
};

export default RuleList;
