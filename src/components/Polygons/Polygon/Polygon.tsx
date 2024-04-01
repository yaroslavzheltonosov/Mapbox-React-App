import { useContext, useEffect, useRef, useState } from "react";
import Button from "../../Button/Button";
import styles from "./Polygon.module.css"
import { PolygonContext } from "../../../App";

type Props = {
    name: string;
    readonly id: string;
    onEditPolygon: (id: string) => void;
    activePolygonId: string;
}

const Polygon = (props: Props) => {
    const {name, onEditPolygon, id, activePolygonId} = props;
    const { setStateContext } = useContext(PolygonContext);
    const [isEditNameFormVisible, setIsEditNameFormVisible] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null); 

    useEffect(() => {
        if (isEditNameFormVisible && inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
    }, [isEditNameFormVisible]);

    const handleEditName = () => {
        setIsEditNameFormVisible((previousState) => !previousState);
    };
    const handleSavePolygon = () => {
        if (!inputRef.current || inputRef.current.value.trim() === '') {
            return;
        }
        setStateContext((previousState) => {
            return previousState.map((polygon) => {
                if (polygon.id === id && 'name' in polygon && inputRef.current) {
                    polygon.name = inputRef.current.value;
                }
                return polygon;
            })
        })
        setIsEditNameFormVisible(false);
    };
    const handleEditPolygon = () => {
        onEditPolygon(id);
    };
    return (
        <div className={styles.PolygonContainer}>
            {isEditNameFormVisible ? (
                <>
                    <input ref={inputRef} />
                    <Button onActionButton={handleSavePolygon} buttonName='SAVE' buttonClass="Primary" />
                </>
            ) : (
                <div className={styles.PolygonName}>{name}</div>
            )}
            <Button onActionButton={handleEditName} buttonName={isEditNameFormVisible ? 'CANCEL' : 'EDIT NAME'} buttonClass="Primary" />
            <Button onActionButton={handleEditPolygon} buttonName="EDIT POLYGON" buttonClass="Primary" disabled={activePolygonId === id} />
        </div>
    )
};

export default Polygon;