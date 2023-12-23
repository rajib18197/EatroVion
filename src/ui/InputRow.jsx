import styles from "./InputRow.module.css";

export default function InputRow({
  htmlFor,
  textLabel,
  value,
  error,
  children,
  ...others
}) {
  return (
    <div className={styles.row}>
      <label htmlFor={htmlFor}>{textLabel}</label>
      <input id={htmlFor} value={value} {...others} />
      {children}
      {error && error}
    </div>
  );
}

// defaultValue because if we provide just "value" property then when we write on input form then that writing words do not shows on the screen but form will be updated, but in the case of defaultvalue writing to the input form will be visible instantly as well as form update also just works fine.
