import { ComponentProps } from "react";
import styles from "./Button.module.css";

type Props = {
    handleActionButton: () => void;
    buttonName: string;
    buttonClass: 'Primary';
} & ComponentProps<'button'>

const Button = (props: Props) => {
    const { handleActionButton, buttonName, buttonClass, ...buttonProps } = props;
    return (
        <button onClick={handleActionButton} className={styles[buttonClass]} {...buttonProps}>{buttonName}</button>
    )
};

export default Button;