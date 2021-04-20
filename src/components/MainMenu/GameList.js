import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import {TextField, Table, TableContainer, TableHead,
  TableBody, TableRow, TableCell, Paper} from '@material-ui/core';

import {useField} from '../../hooks/formHook';

const filterByHost = (games) => {
  games.filter((game) =>
    game.host.toLowerCase().includes(search.value.toLowerCase()),
  );
};

const GameList = () => {
  // eslint-disable-next-line no-unused-vars
  const {reset: searchReset, ...search} = useField('text', 'search');

  const [games, setGames] = useState([]);
  useEffect(async () => {
    // TODO fix links
    // const res = await axios.get(`${API_URL}/games/`);
    // setGames(res.data.items);
  }, []);

  setGames(filterByHost(games));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><TextField {...search} /></TableCell>
            <TableCell>rules</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GameList;
