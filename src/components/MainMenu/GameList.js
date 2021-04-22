import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import {TextField, Table, TableContainer, TableHead,
  TableBody, TableRow, TableCell, Paper} from '@material-ui/core';

import {useField} from '../../hooks/formHook';

const GameList = () => {
  const tempGames = [
    {
      player1: 'esa',
      player2: 'matti',
      rules: {
        rows: 3,
        columns: 3,
        ticksToWin: 3,
      },
    }];
  // eslint-disable-next-line no-unused-vars
  const {reset: searchReset, ...search} = useField('text', 'search');
  // eslint-disable-next-line no-unused-vars
  const [games, setGames] = useState(tempGames);

  useEffect(async () => {
    // TODO fix links
    // const res = await axios.get(`${API_URL}/games/`);
    // setGames(res.data.items);
  }, []);

  const filteredGames = filterByHost(games, search.value);


  console.log('search.value :>> ', search.value);
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
          {filteredGames.map((game) => (
            <TableRow key={`${game.player1},${game.player2}`}>
              <TableCell>{game.player1}</TableCell>
              <TableCell>
                {`${game.rules.columns}x${game.rules.rows}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

const filterByHost = (games, search) => {
  const filtered = search === '' ? games :
  games.filter((game) =>
    game.player1.toLowerCase().includes(search.toLowerCase()));
  return filtered;
};

export default GameList;
