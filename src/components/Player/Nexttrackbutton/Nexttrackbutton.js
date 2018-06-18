import React from 'react';
import { NextButton } from 'react-player-controls';

// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!./Nexttrackbutton.css';

const nexttrackbutton = (props) => {
    return (
        <NextButton className="Nextbutton" onClick={props.nextsong} isEnabled={true}>
            <svg class="Icon" viewBox="0 0 100 100">
                <polygon class="IconShape" points="72.6470588 11 72.6470588 44.1141176 15 12.0911765 15 85.9988235 72.6470588 53.9717647 72.6470588 89.2352941 85 89.2352941 85 11">
                </polygon>
            </svg>
        </NextButton>
    );
}

export default nexttrackbutton