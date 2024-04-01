import { ComponentProps } from "react";
import styles from "./Button.module.css";

type Props = {
    onActionButton: () => void;
    buttonName: string;
    buttonClass: 'Primary';
} & ComponentProps<'button'>

const Button = ({ onActionButton, buttonName, buttonClass, ...buttonProps }: Props) => (
    <button onClick={onActionButton} className={styles[buttonClass]} {...buttonProps}>{buttonName}</button>
);

export default Button;