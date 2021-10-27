import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";

function Map() {
    const key = 'AIzaSyBl5r9VydIWWN5z_QmiZXxgj4S14hNFhbU';
    const defaultZoom = 11;
    const [markers,setMarker] = useState([]);

    const onClick = (coords) => {
        setMarker([{id:markers.length,lat:coords.lat,lng:coords.lng},...markers])

    }
    function markersDisplay() {
        if(markers && markers.length<10) {
            return markers.map((obj, index) => (
                <Marker key={index} lat={obj.lat} lng={obj.lng}/>
            ));
        }
        if(markers.length>9){
            setMarker([])
            alert("Максимально можно добавить только 9 точек")
        }
    }

    return (
        <div className="location-map">
            <div className="location-map_label">Выбрать на карте:</div>
            <div className="location-map_map">
                <div style={{height: '100vh', width: '100%'}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{key: key}}
                        center={{
                            lat: 54.3399097,
                            lng: 48.3826817
                        }}
                        defaultZoom={defaultZoom}
                        onClick={ev =>onClick(ev)}>
                        {markersDisplay()}
                    </GoogleMapReact>
                </div>
            </div>
        </div>
    );
}

export default Map;