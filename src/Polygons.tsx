import { useContext } from "react";
import Polygon from "./Polygon";
import { PolygonContext } from "./App";

import styles from "./MapForm.module.css"

type Props = {
    handleEditPolygon: (id: string) => void;
    activePolygonId: string;
}

const Polygons = (props: Props) => {
    const { stateContext: savedPolygons } = useContext(PolygonContext);
    const { handleEditPolygon, activePolygonId } = props;
    return (
        <div className={styles.PolygonsContainer}>
            <div className={styles.Title}>List of all saved polygons:</div>
            <div className={styles.Polygons}>
                {savedPolygons.map((polygon) => {
                    if ('name' in polygon) {
                        return <Polygon key={polygon.id} name={polygon.name} handleEditPolygon={handleEditPolygon} activePolygonId={activePolygonId} id={polygon.id} />
                    }
                })}
            </div>
        </div>
    )
};

export default Polygons;