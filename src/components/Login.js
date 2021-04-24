import React, {useState, useEffect} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useField} from '../hooks/formHook';

import Notification from './Notification';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


const Login = ({setView}) => {
  const {reset: usernameReset, ...username} = useField('text', 'username');
  const {reset: passwordReset, ...password} = useField('password', 'password');
  const classes = useStyles();
  const [notification, setNotification] = useState({
    open: false,
    message: '',
  });
  const [requests, setRequests] = useState({
    login: {},
    createUser: {},
  });

  useEffect(async () => {
    const apiRes = await getAvailableRequests();
    const loginReq = apiRes.data['@controls']['auth-token'];
    const createUserReq = apiRes.data['@controls']['create-user'];
    setRequests({login: loginReq, createUser: createUserReq});
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = {
      username: username.value,
      password: password.value,
    };
    // if (!userExists(username)) {
    //   createUser(user, requests.createUser);
    // }
    postLogin(user, requests.login, setNotification, setView);
    usernameReset();
    passwordReset();
  };

  return (
    <div className='login'>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
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
      </form>
    </div>
  );
};


// const createUser = async (user, req) => {
//   if (!req.method) {
//     return null;
//   }
//   const request = {
//     method: req.method,
//     url: req.href,
//     crossDomain: true,
//     data: user,
//   };
//   console.log(`request`, request);
//   const res = await axios.request(request);

//   return res;
// };

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
  console.log('res :>> ', res);
  if (res.status===200) {
    window.localStorage.setItem('authToken', `bearer ${res.data.token}`);
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

// const userExists = async (username) => {
//   const res = await axios.request({
//     method: 'GET',
//     url: `${API_URL}/user/${username.value}`,
//     crossDomain: true,
//   });
//   if (res.status === 200) {
//     return true;
//   }
//   return false;
// };

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    }}}));

export default Login;

