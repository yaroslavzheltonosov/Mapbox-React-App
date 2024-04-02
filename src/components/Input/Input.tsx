import { ComponentProps, forwardRef } from "react";
import styles from "./Input.module.css";

type Props = {
    inputClass: 'Primary';
} & ComponentProps<'input'>;

const Input = forwardRef<HTMLInputElement, Props>(({inputClass, ...inputProps}, ref) => (
    <input className={styles[inputClass]} ref={ref} {...inputProps} />
));

export default Input;