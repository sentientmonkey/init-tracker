import React from "react";
import {Container} from '@material-ui/core';
import './Main.css';

interface MainProps {
  children?: any
}

export default function Main(props: MainProps) {
  return (
    <Container>
        <main>
          {props.children}
        </main>
    </Container>
  );
};
