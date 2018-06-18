import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (

    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>CoverFlow</NavigationItem>
        <NavigationItem link="/profile">Profile</NavigationItem>
    </ul>

);

export default navigationItems;