import { useContext, useEffect, useRef, useState } from "react";
import Button from "./Button";
import styles from "./Polygon.module.css"
import { PolygonContext } from "./App";

type Props = {
    name: string;
    readonly id: string;
    handleEditPolygon: (id: string) => void;
    activePolygonId: string;
}

const Polygon = (props: Props) => {
    const {name, handleEditPolygon, id, activePolygonId} = props;
    const { setStateContext } = useContext(PolygonContext);
    const [isEditName, setIsEditName] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null); 

    useEffect(() => {
        if (isEditName && inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
    }, [isEditName]);

    const handleEditName = () => {
        setIsEditName((previousState) => !previousState);
    };
    const handleSavePolygon = () => {
        if (!inputRef.current || inputRef.current.value.trim() === '') return;
        setStateContext((previousState) => {
            return previousState.map((polygon) => {
                if (polygon.id === id && 'name' in polygon && inputRef.current) {
                    polygon.name = inputRef.current.value;
                }
                return polygon;
            })
        })
        setIsEditName(false);
    };
    return (
        <div className={styles.PolygonContainer}>
            {isEditName ? (
                <>
                    <input ref={inputRef} />
                    <Button handleActionButton={handleSavePolygon} buttonName='SAVE' buttonClass="Primary" />
                </>
            ) : (
                <div className={styles.PolygonName}>{name}</div>
            )}
            <Button handleActionButton={handleEditName} buttonName={isEditName ? 'CANCEL' : 'EDIT NAME'} buttonClass="Primary" />
            <Button handleActionButton={() => handleEditPolygon(id)} buttonName="EDIT POLYGON" buttonClass="Primary" disabled={activePolygonId === id} />
        </div>
    )
};

export default Polygon;