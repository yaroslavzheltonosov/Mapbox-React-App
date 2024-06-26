import { useState, useContext, useMemo } from "react";
import { PolygonContext } from "../../App";
import mapboxgl from "mapbox-gl";
import MapForm from "../MapForm/MapForm";
import Polygons from "../Polygons/Polygons";
import Button from "../Button/Button";
import useMap from "../../hooks/useMap";
import styles from "./Mapbox.module.css";
import { MAPBOX_ACCESS_TOKEN } from "../../utils/consts";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const Mapbox = () => {
    const { stateContext, setStateContext } = useContext(PolygonContext);
    const [name, setName] = useState<string>('');
    const {
        mapRef,
        polygons,
        draw,
        activePolygonId,
        setActivePolygonId,
        setPolygons
    } = useMap(setStateContext);
    const isPolygonActive = useMemo(() => activePolygonId.length > 0, [activePolygonId]);
    const isPolygon = useMemo(() => polygons.length > 0, [polygons]);
    const handleDrawPolygon = () => {
        draw.current?.changeMode('draw_polygon');
    };
    const handleRemovePolygon = () => {
        if (!draw.current) return;
        draw.current.trash();
        draw.current.delete(activePolygonId);
        setActivePolygonId('');
        setPolygons((previousState) =>
            previousState.filter((polygon) => polygon.id !== activePolygonId)
        );
        setStateContext((previousState) => previousState.filter((polygon) => polygon.id !== activePolygonId));
    };
    const handleDeleteAll = () => {
        draw.current?.deleteAll();
        setPolygons([]);
        setActivePolygonId('');
        setStateContext([]);
    };
    const handleEditPolygon = (id: string) => {
        if (draw.current && id) {
            draw.current.changeMode('direct_select', { featureId: id });
        }
    };
    const handleSavePolygon = () => {
        if (!activePolygonId) return alert('No polygon selected.');

        const activePolygon = polygons.find(polygon => polygon.id === activePolygonId);
        const isPolygonAlreadySaved = stateContext.some((polygon) => polygon.id === activePolygon?.id);

        if (name.trim() === '' && !isPolygonAlreadySaved) return alert('Input a name for your polygon.');
    
        if (activePolygon && !isPolygonAlreadySaved) {
            const savedPolygon = { name, coords: activePolygon.coords, id: activePolygonId };
            setStateContext((previousState) => [...previousState, savedPolygon]);
            setName('');
        }
        setActivePolygonId('');
        if (draw.current) draw.current.changeMode('simple_select');
    };

    return (
        <div className={styles.MapContainer}>
            <div className={styles.Map} ref={mapRef} />
            <div className={styles.ButtonContainer}>
                {isPolygonActive && <Button onActionButton={handleSavePolygon} buttonName="SAVE" buttonClass="Primary" />}
                {isPolygonActive && isPolygon && <Button onActionButton={handleRemovePolygon} buttonName="CLEAR" buttonClass="Primary" />}
                <Button onActionButton={handleDrawPolygon} buttonName="ADD" buttonClass="Primary" />
                {isPolygon && <Button onActionButton={handleDeleteAll} buttonName="DELETE ALL" buttonClass="Primary" />}
            </div>
            <div className={styles.PolygonsFormContainer}>
                <MapForm setName={setName} name={name} />
                <Polygons onEditPolygon={handleEditPolygon} activePolygonId={activePolygonId} />
            </div>
        </div>
    );
};

export default Mapbox;
