import { SetStateAction } from "react";
import styles from "./MapForm.module.css";
import Input from "../Input/Input";

type Props = {
    setName: React.Dispatch<SetStateAction<string>>;
    name: string;
}

const MapForm = (props: Props) => {
    const { setName, name } = props;
    const handleSetValueName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };
    const handleFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
    }
    return (
        <form className={styles.MapForm} onSubmit={handleFormSubmit}>
            <div className={styles.AddNewPolygon}>
                <label className={styles.Title} htmlFor="InputName">Title</label>
                <Input inputClass="Primary" value={name} onChange={handleSetValueName} id="InputName" placeholder="Enter name"/>
            </div>
        </form>
    )    
};

export default MapForm;