import React from 'react';

import classes from './Toolbar.css';
import Search from '../../Search/Search';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = (props) => (
    <div className={classes.Toolbar}>
        <div className={classes.Logo}>
            <p>Logo</p>
        </div>
        
        <Search />


        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </div>
);

export default toolbar;