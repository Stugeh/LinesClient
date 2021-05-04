import React from 'react';
import {Snackbar} from '@material-ui/core';

// Can be used to display any notification
// at the bottom of the screen for 6 seconds
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
