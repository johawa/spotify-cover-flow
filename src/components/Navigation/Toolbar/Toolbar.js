import React from "react";

import classes from "./Toolbar.css";
import Search from "../../Search/Search";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "./Logo";

const toolbar = props => (
  <div className={classes.Toolbar}>
    <Logo />
    <Search />
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </div>
);

export default toolbar;
