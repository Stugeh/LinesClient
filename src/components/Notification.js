import React from 'react';
import {Snackbar} from '@material-ui/core';

const Notification = ({notification, setNotification}) => {
  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={6000}
      message={notification.message}
      onClose={() => setNotification({message: '', open: false})}
    />
  );
};

export default Notification;
