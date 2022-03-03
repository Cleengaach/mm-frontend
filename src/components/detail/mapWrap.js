import React, { useState } from "react";
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet'
import * as mapStyles from "./mapWrap.module.scss";

const MapWrap = ({ data }) => {

    //uniqe key leaflet map
    let newDate = new Date().getTime()

    //hladanie stredu z jsonu
    var x1 = 10000000;
    var y1 = 10000000;
    var x2 = 0;
    var y2 = 0;
    var coordinates;
    data.features.forEach((element, i) => {
        coordinates = element.geometry.coordinates;
    });
    coordinates.forEach((element, i) => {
        if (x1 > element[0]) {
            x1 = element[0]
        }
        if (x2 < element[0]) {
            x2 = element[0]
        }
        if (y1 > element[1]) {
            y1 = element[1]
        }
        if (y2 < element[1]) {
            y2 = element[1]
        }
    });

    const center = [];
    center.x = x1 + ((x2 - x1) / 2);
    center.y = y1 + ((y2 - y1) / 2);

    const zoomFactor = ((x2 - x1) + (y2 - y1));
    var zoom = '';
    if (zoomFactor > 0.02) {
        zoom = 13;
    } else {
        zoom = 14;
    }

    const [isActive, setActive] = useState(false);
    const [map, setMap] = useState(null);

    function FlyToButton(children) {
        const onClick = () => {
            setActive(!isActive);
            setTimeout(function () { map.invalidateSize() }, 1);
        };
        return (
            <button onClick={onClick} className={mapStyles.tour_detail_map_button} >
                {children.text}
            </button>
        );
    }

    if (typeof window !== 'undefined') {
        return (
            <div className={isActive ? mapStyles.tour_detail_map_fullscreen : mapStyles.tour_detail_map}>
                <FlyToButton text={isActive ? 'zatvorit' : 'zvacsit'} />
                <MapContainer center={[center.y, center.x]} zoom={zoom} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }} whenCreated={setMap}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON key={newDate} data={data.features} />
                </MapContainer>
            </div>
        );
    } else {
        return null
    }

};

export default MapWrap;