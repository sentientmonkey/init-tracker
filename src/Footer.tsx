import React from "react";
import { Link } from "@material-ui/core";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="Footer">
      <p>
        by{" "}
        <Link
          color="secondary"
          underline="always"
          href="http://www.scottwindsor.com"
        >
          Scott Windsor
        </Link>
        &nbsp; &ndash; &nbsp;
        <Link
          color="secondary"
          underline="always"
          href="http://github.com/sentientmonkey/init-tracker"
        >
          code
        </Link>
      </p>
    </footer>
  );
}
