import React from 'react'
import classes from './Suggestion.css';

const Suggestions = (props) => {
    let options = (
        <li>
            test
    </li>);

    return <div className={classes.Suggestion}>
        <ul>{options}</ul>
    </div>
}

export default Suggestions