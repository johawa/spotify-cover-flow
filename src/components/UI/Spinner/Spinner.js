import React from "react";

import classes from "./Spinner.css";

const spinner = () => (
  <div className={classes.spinner}>
    <div className={classes.bounce1} />
    <div className={classes.bounce2} />
    <div className={classes.bounce3} />
  </div>
);

export default spinner;
