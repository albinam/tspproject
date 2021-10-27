import React, {useEffect, useState} from "react";
import {Slider, Button, Select} from 'antd';
import GA from "./GA";
import Marker from "../Map/Marker";
import "./TSP.scss"
import GoogleMapReact from 'google-map-react';

const {Option} = Select;

function TSP() {
    const [gaSteps, setGASteps] = useState(null);
    const [status, setStatus] = useState("Paused");
    const [speed, setSpeed] = useState(300);
    const [generations, setGenerations] = useState(20);
    const [initialPopulation, setInitialPopulation] = useState(10);
    const [data, setData] = useState(null);
    const [map, setMap] = useState();
    const [maps, setMaps] = useState();
    const [dur, setDuration] = useState();
    const [dis, setDistance] = useState();
    const [travelMode, setTravelMode] = useState("DRIVING");
    const [markers, setMarker] = useState([]);
    const key = process.env.REACT_APP_GOOGLE_MAPS_API;
    const defaultZoom = 15;

    const onClick = (coords) => {
        setMarker([...markers, {id: markers.length, lat: coords.lat, lng: coords.lng}])
        if (markers.length > 8) {
            alert("Максимально можно добавить только 9 точек")
            window.location.reload()
        }
    }

    function onMapLoaded(map, maps) {
        setMap(map);
        setMaps(maps);
    }

    function getPath(result, graph) {
        let directionsService = new maps.DirectionsService();
        let directionsDisplay = new maps.DirectionsRenderer();
        directionsDisplay.setOptions({suppressMarkers: true});
        let waypts = [];
        let l = result ? result.length : 0;
        for (let i = 0; i < l - 1; i++) {
            waypts.push({
                location: graph[result[i]],
                stopover: true
            });
        }
        let request = {
            origin: graph[result[0]],
            destination: graph[result[0]],
            waypoints: waypts,
            travelMode: travelMode,
            avoidHighways: false,
            avoidTolls: false,
            optimizeWaypoints: false,
            provideRouteAlternatives: true
        };
        let duration = 0;
        let distance = 0;
        directionsService.route(request, function (response, status) {
            if (status === maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                response.routes[0].legs.map(resp => {
                    duration = duration + parseInt(resp.duration.value);
                    distance = distance + parseInt(resp.distance.value);
                })
            }
            setDuration(Math.ceil(duration / 60));
            setDistance(distance)
        });
        directionsDisplay.setMap(map);
    }

    function markersDisplay() {
        if (markers && markers.length <= 9) {
            return markers.map((obj, index) => (
                <Marker key={index} index={index} lat={obj.lat} lng={obj.lng}/>
            ));
        }
    }

    const handleClick = () => {
        status.localeCompare("Playing") === 0
            ? setStatus("Paused")
            : setStatus("Playing");
    }

    const plot = (graph, result) => {
        if (markers) {
            let l = result ? result.length : 0;
            for (let i = 0; i < l - 1; i++) {
                const paths = [{lat: graph[result[i]]?.lat, lng: graph[result[i]]?.lng}, {
                    lat: graph[result[i + 1]]?.lat,
                    lng: graph[result[i + 1]]?.lng
                }];

                let nonGeodesicPolyline = new maps.Polyline({
                    path: paths,
                    geodesic: false,
                    strokeColor: "#430284",
                    strokeOpacity: 0.7,
                    strokeWeight: 3
                })
                nonGeodesicPolyline.setMap(map)
            }
        }
    }

    useEffect(() => {
        setGASteps(GA(markers.length, markers, generations, initialPopulation));
    }, [generations, initialPopulation, markers]);

    useEffect(() => {
        if (gaSteps != null && status.localeCompare("Playing") === 0) {
            const interval = setInterval(() => {
                const next = gaSteps.next();
                if (next.done) {
                    setStatus("Paused");
                    setGASteps(
                        GA(markers.length, markers, generations, initialPopulation)
                    );
                    return;
                }
                const state = next.value;
                setData(state);
            }, speed);
            return () => {
                clearInterval(interval);
            };
        }
    }, [
        gaSteps,
        markers,
        status,
        speed,
        initialPopulation,
        generations
    ]);

    return (
        <div className="main-container">
            <div className="main-container_params">
                <h3>Решение задачи коммивояжера генетическим алгоритмом</h3>
                <div className="main-container_slider">
                    <div>Количество поколений: {generations}</div>
                    <Slider
                        min={1}
                        max={100}
                        onChange={(val) => {
                            setGenerations(val);
                        }}
                        value={generations}
                    />
                </div>
                <div className="main-container_slider">
                    <div>Начальная популяция: {initialPopulation}</div>
                    <Slider
                        min={1}
                        max={100}
                        onChange={(val) => {
                            setInitialPopulation(val);
                        }}
                        value={initialPopulation}
                    />
                </div>
                <div className="main-container_slider">
                    <div>Скорость: {speed}</div>
                    <Slider
                        min={100}
                        max={2000}
                        value={speed}
                        onChange={(val) => {
                            setSpeed(val);
                        }}
                    />
                </div>
                <div>Способ передвижения</div>
                <Select defaultValue="DRIVING" onChange={(value) => {
                    setTravelMode(value);
                }}>
                    <Option value="DRIVING">На машине</Option>
                    <Option value="WALKING">Пешком</Option>
                </Select>
                <h4>Расстояние, рассчитанное по генетическому алгоритму: {data?.result?.fitness} м</h4>
                <h4>Время в пути: {dur} мин</h4>
                <h4>Расстояние по карте: {dis} м</h4>
                <h4>Найденная последовательность точек: {data?.result?.path}</h4>
                <Button type="primary"
                        disabled={status.localeCompare("Playing") === 0}
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick()
                        }}
                >Начать</Button>
            </div>
            <div className="main-container_map" style={{height: '100vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: key}}
                    center={{
                        lat: 54.3399097,
                        lng: 48.3826817
                    }}
                    defaultZoom={defaultZoom}
                    onClick={ev => onClick(ev)}
                    onGoogleApiLoaded={({map, maps}) => onMapLoaded(map, maps)}>
                    {markersDisplay()}
                    {(data?.result?.path && status.localeCompare("Paused") === 0) ? plot(markers, data.result.path) : null}
                    {(data?.result?.path && status.localeCompare("Paused") === 0) ? getPath(data?.result?.path, markers) : null}
                </GoogleMapReact>
            </div>
        </div>
    );
}

export default TSP;
