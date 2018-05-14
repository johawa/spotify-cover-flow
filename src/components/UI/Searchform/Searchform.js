import React from 'react';

const searchform = (props) => {

    return (

        <form onChange={props.submit}>
            <h2>Search For an Artist:</h2>
            <input type="text" placeholder="Type an Artist Name" />            
        </form>

    );
 
  }

export default searchform;