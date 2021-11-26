import React, {useEffect, useRef, useState} from "react";
import {Slider, Button, Select} from 'antd';
import GA from "../ga/GA";
import Marker from "../Map/Marker";
import "./TSP.scss"
import GoogleMapReact from 'google-map-react';
import Popup from "../Popup/Popup";

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
    const [canDraw, setCanDraw] = useState(false);
    const p = useRef([]);
    const d = useRef([]);
    const [isOpen, setIsOpen] = useState(false);
    const key = process.env.REACT_APP_GOOGLE_MAPS_API;
    const defaultZoom = 15;

    const onClick = (coords) => {
        setMarker([...markers, {id: markers.length, lat: coords.lat, lng: coords.lng}])
        setCanDraw(false)
        if (markers.length > 8) {
            alert("Максимально можно добавить только 9 точек")
            clear()
        }
    }

    function onMapLoaded(map, maps) {
        setMap(map);
        setMaps(maps);
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const clear = () => {
        setMarker([]);
        if (p.current) {
            for (let i = 0; i < p.current.length; i++) {
                p.current[i].setMap(null);
            }
        }
        if (d.current[0]) {
            d.current[0].setMap(null);
        }
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
        let directions = [];
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
        for (let i = 0; i < d.current.length; i++) {
            d.current[i].setMap(null);
        }
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
        directions.push(directionsDisplay)
        d.current = directions;
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
        let paths = [];
        if (markers) {
            let l = result ? result.length : 0;
            for (let i = 0; i < l - 1; i++) {
                paths = [...paths, {lat: graph[result[i]]?.lat, lng: graph[result[i]]?.lng}, {
                    lat: graph[result[i + 1]]?.lat,
                    lng: graph[result[i + 1]]?.lng
                }];
            }
            for (let i = 0; i < p.current.length; i++) {
                p.current[i].setMap(null);
            }
            let nonGeodesicPolyline = new maps.Polyline({
                path: paths,
                geodesic: false,
                strokeColor: "#430284",
                strokeOpacity: 0.7,
                strokeWeight: 2
            })
            let lines = []
            lines.push(nonGeodesicPolyline)
            nonGeodesicPolyline.setMap(map);
            p.current = lines;
        }
    }

    useEffect(() => {
        if (markers) {
            setGASteps(GA(markers.length, markers, generations, initialPopulation));
        }
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
                    setCanDraw(false)
                    return;
                }
                const state = next.value;
                setData(state);
                setCanDraw(true)
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
                <h4>Установите от 2 до 9 точек на карте для начала работа алгоритма</h4>
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
                        disabled={status.localeCompare("Playing") === 0 || markers.length < 2}
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick()
                        }}
                >Начать</Button>
                <Button type="primary"
                        style={{marginTop:'10px'}}
                        onClick={() => clear()}
                >Очистить карту</Button>
                <div className="legend">
                    <div className="legend_line">
                        <div className="blue"/>
                        <div>Путь по карте</div>
                    </div>
                    <div className="legend_line">
                        <div className="purple"/>
                        <div>Путь по генетическому алгоритму</div>
                    </div>
                </div>

            <Button type="primary"
                    onClick={togglePopup}
                    style={{marginTop:'10px'}}
            >Открыть описание алгоритма</Button>
            {isOpen && <Popup
                content={<>
                    <b>Описание генетического алгоритма</b>
                    <p>Задача коммивояжера задает такой вопрос: «Учитывая список
                        городов и расстояния между каждой парой городов, каков кратчайший
                        возможный маршрут, который включает каждый город и возвращается в
                        исходный город?»

                    Задача решается использованием генетического алгоритма, в качестве функции приспособленности используется формула
                    гаверсинусов, которая позволяет найти расстояние между двумя географическими координатами.
                    Пользователь задает количество количество поколений, начальную популяцию и величину задержки между поколениями.
                    В результате работы алгоритма находится хромосома, которая содержит в себе точки на карте, в той последовательности,
                    которая имеет наименьшее итоговое расстояние.
                    </p>
                </>}
                handleClose={togglePopup}
            />}
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
                    {(canDraw) ? plot(markers, data.result.path) : null}
                    {(data?.result?.path && status.localeCompare("Paused") === 0) ? getPath(data?.result?.path, markers) : null}
                </GoogleMapReact>
            </div>
        </div>
    );
}

export default TSP;
