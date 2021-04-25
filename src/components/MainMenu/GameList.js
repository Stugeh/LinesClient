import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  TextField, Table, TableContainer, TableHead,
  TableBody, TableRow, TableCell, Paper, Button,
} from '@material-ui/core';

import {useField} from '../../hooks/formHook';

const API_URL = process.env.REACT_APP_API_URL;
const HEADERS = {
  headers: {
    'Authorization': window.localStorage.getItem('authToken'),
  },
};

const USERNAME = window.localStorage.getItem('username');

const GameList = ({setGameUri, setView, gameUri}) => {
  // eslint-disable-next-line no-unused-vars
  const {reset: searchReset, ...search} = useField('text', 'search');
  // eslint-disable-next-line no-unused-vars
  const [games, setGames] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`${API_URL}games`, HEADERS);
    setGames(res.data.items);
  }, []);

  const filteredGames = filterByHost(games, search.value);

  return (
    <TableContainer
      style={{
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
        minWidth: '300px',
      }}
      component={Paper}
    >
      <Table aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell>
              <TextField {...search} />
              <h2 style={{marginBottom: '0px'}}>Player1</h2>
            </TableCell>
            <TableCell>
              <h2 style={{marginBottom: '-30px'}}>rules</h2>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredGames.map((game) => (
            <TableRow key={`${game['@controls'].self.href}`}>
              <TableCell>

                <Button
                  variant='contained'
                  color='primary'
                  style={{marginRight: '5px'}}
                  onClick={() => {
                    setGameUri(game['@controls'].self.href);
                    setView('game');
                    axios.put(
                        `${game['@controls'].self.href}join/`,
                        {user: USERNAME, rule: game.rule},
                        HEADERS,
                    );
                  }}
                >
                  join
                </Button>

                {game.player1}
              </TableCell>
              <TableCell>
                {`${game.rule}`}
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
    game.player1.toLowerCase().includes(search.toLowerCase()) ||
    game.player2.toLowerCase().includes(search.toLowerCase()),
  );
  return filtered;
};

export default GameList;
