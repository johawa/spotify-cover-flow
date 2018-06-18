import React from 'react';
import { PrevButton } from 'react-player-controls';

// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!./Previoustrackbutton.css';


const previoustrackbutton = (props) => {

    return (       
        <PrevButton class="Prevbutton" onClick={props.previoussong} isEnabled={true}>
            <svg class="Icon" viewBox="0 0 100 100">
                <polygon class="IconShape" points="85 12.6092632 27.3529412 44.5358947 27.3529412 11 15 11 15 89 27.3529412 89 27.3529412 54.368 85 86.3028421">
                </polygon>
            </svg>
        </PrevButton>
    );
}

export default previoustrackbutton