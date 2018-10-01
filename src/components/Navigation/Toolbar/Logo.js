import React from "react";
import classes from "./Logo.css";

const Logo = props => {
  return (
    <div className={classes.LogoContainer}>
      <div className={classes.LogoDivs}>
        <div className={classes.LogoDiv_1} />
        <div className={classes.LogoDiv_2} />
        <div className={classes.LogoDiv_3} />
      </div>
      <div className={classes.LogoName}>
        <p>Spotify - Coverflow</p>
      </div>
    </div>
  );
};
export default Logo;
