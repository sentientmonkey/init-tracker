import React from 'react';
import {Link as RouterLink} from "react-router-dom";

import {
  AppBar,
  Button,
  Toolbar
} from '@material-ui/core';

const AdapterLink = React.forwardRef((props: any, ref: any) => <RouterLink innerRef={ref} {...props} />);

export default function PrimaryNav() {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
          <Button color="inherit" component={AdapterLink} to="/">Initiative Tracker</Button>
          <Button color="inherit" component={AdapterLink} to="/encounter">Encounter Builder</Button>
      </Toolbar>
    </AppBar>
  );
}
