import React from 'react';
import './Marker.scss';

function Marker({index}) {

    return (
        <div className="location-map_marker">
            <div className="location-map_marker_index">{index}</div>
        </div>
    );
}

export default Marker;