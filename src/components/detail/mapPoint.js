import React, { useState, useContext, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "../../assets/css/mapWrap.scss";
import { NavContext } from "../../context/NavProvider";
import { IoHandRightOutline, IoClose } from "react-icons/io5";

const MapPoint = ({ north, east }) => {

    function useHasMounted() {
        const [hasMounted, setHasMounted] = useState(false);
        useEffect(() => {
            setHasMounted(true);
        }, []);
        return hasMounted;
    }


    //uniqe key leaflet map
    let newDate = new Date().getTime()

    const [isActive, setActive] = useState(false);
    const { show, setShow } = useContext(NavContext);

    function FlyToButton({text}) {
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
                {text === 'zvačšiť a ovládať' ? <IoHandRightOutline /> : <IoClose />}
                {text === 'zvačšiť a ovládať' ?
                    <span>
                        {text}
                    </span>
                    : null}
            </button>
        );
    }
 
    return (
        <>
            <div className={show === true ? "tour_detail_map " : "tour_detail_map  fullscreen"}>
                {useHasMounted && (
                    <MapContainer center={[north, east]} zoom={13} scrollWheelZoom={false} dragging={false} style={{ height: "100%", width: "100%" }}>
                        <FlyToButton text={isActive ? '' : 'zvačšiť a ovládať'} />
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
         
        </>
    );

};

export default MapPoint;