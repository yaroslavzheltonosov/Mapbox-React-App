import { useContext } from "react";
import { PolygonContext } from "../../App";
import Polygon from "./Polygon/Polygon";

import styles from "../MapForm/MapForm.module.css"

type Props = {
    onEditPolygon: (id: string) => void;
    activePolygonId: string;
}

const Polygons = ({ onEditPolygon, activePolygonId }: Props) => {
    const { stateContext: savedPolygons } = useContext(PolygonContext);
    return (
        <div className={styles.PolygonsContainer}>
            <div className={styles.Title}>List of all saved polygons:</div>
            <div className={styles.Polygons}>
                {savedPolygons.map((polygon) => {
                    if ('name' in polygon) {
                        return <Polygon key={polygon.id} name={polygon.name} onEditPolygon={onEditPolygon} activePolygonId={activePolygonId} id={polygon.id} />
                    }
                })}
            </div>
        </div>
    )
};

export default Polygons;