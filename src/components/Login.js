import React, {useState} from 'react';
// import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useField} from '../hooks/formHook';

import Notification from './Notification';

// const API_URL = '';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

// TODO
// const createUser = async () => {
//   await axios.post(`${API_URL}/users/`, user);
// };

// const postLogin = async ({user}) => {
//   const res = await axios.post(`${API_URL}/login/`, user);
//   if (res.status===201) {
// TODO the token probably wont be in res.token
//     window.localStorage.setItem('authToken', `bearer ${res.token}`);
//   } else {
//     setNotification({open: true, message: 'login failed'});
//   }
// };

const Login = () => {
  const {reset: usernameReset, ...username} = useField('text', 'username');
  const {reset: passwordReset, ...password} = useField('text', 'password');
  const classes = useStyles();
  const [notification, setNotification] = useState({
    open: false,
    message: '',
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    // TODO
    // const user = {
    //   username: username.value,
    //   password: password.value,
    // };
    setNotification({open: true, message: 'login failed'});
    // const res = await axios.get(`${API_URL}/user/${username.value}`);
    // if (res.status !== 200) {
    //   createUser();
    // }
    // postLogin(user);
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

export default Login;
