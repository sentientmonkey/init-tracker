import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function PrimaryNav() {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Typography variant="h6">
            Initiative Tracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
