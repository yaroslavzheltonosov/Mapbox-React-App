import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import styles from "./Map.module.css";
import { MAPBOX_ACCESS_TOKEN } from "./consts";
import { LocationPosition } from "./types";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const Map = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [lng, setLng] = useState<number>(-0.127758);
    const [lat, setLat] = useState<number>(51.507351);
    const [zoom, setZoom] = useState(15);
    useEffect(() => {
        const handleSuccessLocation = (position: LocationPosition) => {
            setLng(position.coords.longitude);
            setLat(position.coords.latitude);
        };
        const handleErrorLocation = () => {
            console.log('Error');
        };
        navigator.geolocation.getCurrentPosition(handleSuccessLocation, handleErrorLocation, { enableHighAccuracy: true });

        const map = new mapboxgl.Map({
            container: mapRef.current || '',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom,
        });
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav);

        return () => map.remove();
    }, [lng, lat, zoom]);
    return (
        <div className={styles.Map} ref={mapRef} />
    )
}

export default Map;