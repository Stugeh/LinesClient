import React from 'react';
import {useField} from '../hooks/formHook';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const API_URL = '';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const createUser = async () => {
  await axios.post(`${API_URL}/users/`, user);
};

const Login = () => {
  const {reset: usernameReset, ...username} = useField('text', 'username');
  const {reset: passwordReset, ...password} = useField('text', 'password');
  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = {
      username: username.value,
      password: password.value,
    };
    if (!await axios.get(`${API_URL}/user/${username.value}`)) {
      createUser();
    }
    const res = await axios.post(`${API_URL}/login/`, user);
    if (res.status===201) {
      // TODO the token probably wont be in res.token
      window.localStorage.setItem('authToken', `bearer ${res.token}`);
    } else {

    }
    usernameReset();
    passwordReset();
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
      </form>
    </div>
  );
};

export default Login;
