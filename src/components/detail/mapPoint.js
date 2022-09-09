import React, { useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "../../assets/css/mapWrap.scss";
import { motion } from "framer-motion";
import { NavContext } from "../../context/NavProvider";
import { BsArrowsFullscreen, BsXSquare } from "react-icons/bs"

import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'

const MapPoint = ({ north, east, mountain }) => {

    function useHasMounted() {
        const [hasMounted, setHasMounted] = React.useState(false);
        React.useEffect(() => {
            setHasMounted(true);
        }, []);
        return hasMounted;
    }


    //uniqe key leaflet map
    let newDate = new Date().getTime() 



    const [isActive, setActive] = useState(false);
    const { show, setShow } = useContext(NavContext);

    function FlyToButton(children) {
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
                    {children.text}
                </span>
                {children.text === 'zvacsit' ? <BsArrowsFullscreen /> : <BsXSquare />}
            </button>
        );
    }

    return (
        <>
            <div className={show === true ? "tour_detail_map " : "tour_detail_map  fullscreen" }>
                {useHasMounted && (
                    <MapContainer center={[north, east]} zoom={13} scrollWheelZoom={false} dragging={false} style={{ height: "100%", width: "100%" }}>
                         <FlyToButton text={isActive ? 'zatvorit' : 'zvacsit'} />
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[north, east]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                )}
            </div>
            <div className="tour_detail_region_wrap">

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

export default MapPoint;