import React from 'react';
import {Snackbar, MuiAlert} from '@material-ui/core';


const Alert = (props) =>(
  <MuiAlert elevation={6} variant="filled" {...props} />
);

const Notification = ({severity, state, message}) => (
  <Snackbar open={open} autoHideDuration={6000}>
    <Alert severity={severity}>{message} </Alert>
  </Snackbar>
);

export default Notification;
