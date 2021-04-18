import React from 'react';
import {useField} from '../hooks/formHook';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

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
    // TODO fix post
    const res = await axios.post(user);
    console.log('res: ', res);
    usernameReset();
    passwordReset();
  };

  return (
    <div className='login'>
      <form className={classes.root} onSubmit={handleLogin}>
        <TextField {...username}/>
        <TextField {...password}/>
        <Button variant='contained' color='primary' type="submit">save</Button>
      </form>
    </div>
  );
};

export default Login;
