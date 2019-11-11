import React from "react";
import Hidden from '@material-ui/core/Hidden';
import './Main.css';

interface MainProps {
  children?: any
}

export default function Main(props: MainProps) {
  return (
    <>
    <Hidden mdUp>
        <main className="Main-small">
          {props.children}
        </main>
      </Hidden>
      <Hidden smDown>
        <main className="Main-large">
          {props.children}
        </main>
      </Hidden>
    </>
  );
};
