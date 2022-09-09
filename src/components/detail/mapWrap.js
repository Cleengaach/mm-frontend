import React, { useState, useContext, useEffect, useRef  } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import "../../assets/css/mapWrap.scss";
import { NavContext } from "../../context/NavProvider";
import { BsArrowsFullscreen, BsXSquare } from "react-icons/bs"

const MapWrap = ({ data, region, mountain }) => {

    function useHasMounted() {
        const [hasMounted, setHasMounted] = useState(false);
        useEffect(() => {
            setHasMounted(true);
        }, []);
        return hasMounted;
    }

    const buttonRef = useRef()


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
    const { show, setShow } = useContext(NavContext);

    function FlyToButton ({buttonRef, text}) {
        const map = useMap()

        const onClick = () => {

            if (!isActive) {
                map.scrollWheelZoom.enable();
                map.dragging.enable();
            } else {
                map.scrollWheelZoom.disable();
                map.dragging.disable();
            }
            setActive(!isActive);
            setShow(!show);
            setTimeout(
                function () {
                    map.invalidateSize();

                }, 1);
        };
        return (
            <button onClick={onClick} className="tour_detail_map_button" >
                <span>
                    {text}
                </span>
                {text === 'zvacsit' ? <BsArrowsFullscreen /> : <BsXSquare />}
            </button>
        );
    }

    return (
        <>
            <div className={show === true ? "tour_detail_map " : "tour_detail_map  fullscreen"}>
                {useHasMounted && (
                    <MapContainer center={[center.y, center.x]} zoom={zoom} scrollWheelZoom={false} dragging={false} style={{ height: "100%", width: "100%" }}>
                         <FlyToButton buttonRef={buttonRef} text={isActive ? 'zatvorit' : 'zvacsit'} />
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <GeoJSON key={newDate} data={data.features} />
                    </MapContainer>
                )}
            </div>
            <div className="tour_detail_region_wrap">
                {region.length > 0 ? <div className="tour_detail_region">
                    <small>kraj</small>
                    <b>
                        {region}
                    </b>
                   
                </div> : null}
                {mountain && <div className="tour_detail_region">
                    <small>pohorie</small>
                    <b>
                        {mountain.title}
                    </b>
                </div>}
            </div>
        </>
    );

};

export default MapWrap;