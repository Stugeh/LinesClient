import React, {useState, useEffect} from 'react';

import {makeStyles} from '@material-ui/core/styles';

import {
  TextField, Button, Dialog,
  DialogActions, DialogContent,
} from '@material-ui/core';

import {useField} from '../hooks/formHook';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


const Login = ({setView, setNotification}) => {
  const {reset: usernameReset, ...username} = useField('text', 'username');
  const {reset: passwordReset, ...password} = useField('password', 'password');
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState({
    login: {},
    createUser: {},
  });
  const classes = useStyles();

  // Fetches available requests from the API
  useEffect(async () => {
    const apiRes = await getAvailableRequests();
    const loginReq = apiRes.data['@controls']['auth-token'];
    const createUserReq = apiRes.data['@controls']['create-user'];
    setRequests({login: loginReq, createUser: createUserReq});
  }, []);

  // Click handler for the login button.
  const handleLogin = async (event) => {
    event.preventDefault();
    const user = {
      username: username.value,
      password: password.value,
    };
    postLogin(user, requests.login, setNotification, setView);
    usernameReset();
    passwordReset();
  };

  // Click handler for the create user button
  const handleCreateUser = async (event) => {
    event.preventDefault();
    createUser({
      username: username.value,
      password: password.value,
    },
    requests.createUser,
    );
    setOpen(false);
  };

  return (
    <div className='login'>
      <h1>Login/Create new user</h1>
      <form className={classes.root} onSubmit={handleLogin}>
        <TextField {...username}/><br/>
        <TextField {...password}/><br/>
        <Button
          variant='contained'
          color='primary'
          type="submit"
        >
          submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={()=> setOpen(true)}
        >
        create new
        </Button>

        <Dialog open={open} onClose={()=> setOpen(false)}>
          <DialogContent>
            <TextField {...username}/><br/>
            <TextField {...password}/><br/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateUser}>
              Create
            </Button>
            <Button onClick={()=> setOpen(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
};

// Creates a new user in the api database
const createUser = async (user, req) => {
  if (!req.method) {
    return null;
  }
  const request = {
    method: req.method,
    url: req.href,
    crossDomain: true,
    data: user,
  };
  const res = await axios.request(request);
  return res;
};

// logs user in and saves the authToken and username in browser storage
const postLogin = async (user, req, setNotification, setView) => {
  if (!req.method) {
    return null;
  }
  const res = await axios.request({
    method: req.method,
    url: req.href,
    crossDomain: true,
    data: user,
  });
  if (res.status===200) {
    window.localStorage.setItem('authToken', `Token ${res.data.token}`);
    window.localStorage.setItem('username', user.username);
    setView('mainMenu');
  } else {
    setNotification({open: true, message: 'login failed'});
  }
};

const getAvailableRequests = async () => {
  const apiRes = await axios.request({
    method: 'GET',
    url: API_URL,
    crossDomain: true,
  });
  return apiRes;
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    }}}));

export default Login;

