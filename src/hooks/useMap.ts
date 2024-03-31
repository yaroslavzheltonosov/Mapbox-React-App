import { useState, useEffect, useRef } from 'react';
import mapboxgl, {FeatureIdentifier, Map as MapBoxType} from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { DEFAULT_COORDINATES, MAPBOX_ACCESS_TOKEN } from '../utils/consts';
import { MapValues, PolygonStorage, setStateContextT } from '../utils/types';

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const useMap = (setStateContext: setStateContextT) => {
    const mapRef = useRef(null);
    const map = useRef<MapBoxType>();
    const draw = useRef<MapboxDraw>();
    const [polygons, setPolygons] = useState<Array<PolygonStorage>>([]);
    const [mapCoordValues, setMapCoordValues] = useState<MapValues>({ longitude: DEFAULT_COORDINATES.LNG, latitude: DEFAULT_COORDINATES.LAT });
    const [activePolygonId, setActivePolygonId] = useState<string>('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setMapCoordValues({longitude: position.coords.longitude, latitude: position.coords.latitude});
                },
                () => {
                    console.error("Geolocation failed, using default position.");
                },
                { enableHighAccuracy: true }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapRef.current || '',
            style: "mapbox://styles/mapbox/light-v11",
            center: [mapCoordValues.longitude, mapCoordValues.latitude],
            zoom: 15,
        });

        map.current.addControl(new mapboxgl.NavigationControl());
        draw.current = new MapboxDraw({
            displayControlsDefault: false,
        });

        map.current.on("load", () => {
            if (!map.current || !draw.current) return;
            map.current.addControl(draw.current);
        });

        map.current.on("draw.create", (e) => {
            const feature = e.features[0];
            if (feature.geometry.type === 'Polygon') {
                const newPolygon = {id: String(feature.id), coords: feature.geometry.coordinates[0]};
                setPolygons((prev) => [...prev, newPolygon]);
            }
        });

        map.current.on("draw.delete", (e) => {
            e.features.forEach((feature: FeatureIdentifier) => {
                setPolygons((prev) => prev.filter((polygon) => polygon.id !== feature.id));
            });
        });

        map.current.on("draw.selectionchange", ({ features }) => {
            setActivePolygonId(features.length > 0 ? features[0].id : '');
        });

        map.current.on("draw.update", (e) => {
            const updatedFeatures = e.features;
            setStateContext((previousState) => {
                return previousState.map((savedPolygon) => {
                    const updatedFeature = updatedFeatures.find((feature: FeatureIdentifier) => feature.id === savedPolygon.id);
                    return updatedFeature ? {...savedPolygon, coords: updatedFeature.geometry.coordinates[0]} : savedPolygon;
                });
            });
        });

        return () => map.current?.remove();
    }, [mapCoordValues.latitude, mapCoordValues.longitude, setStateContext]);

    return { mapRef, polygons, draw, activePolygonId, setActivePolygonId, setPolygons };
};

export default useMap;
