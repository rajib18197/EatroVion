import styles from "./InputRow.module.css";

export default function InputRow({
  htmlFor,
  onChange,
  textLabel,
  value,
  children,
  isTransformToNum = false,
}) {
  return (
    <div className={styles.row}>
      <label htmlFor={htmlFor}>{textLabel}</label>
      <input
        id={htmlFor}
        onChange={(e) => {
          onChange(isTransformToNum ? Number(e.target.value) : e.target.value);
        }}
        defaultValue={value}
      />
      {children}
    </div>
  );
}

// defaultValue because if we provide just "value" property then when we write on input form then that writing words do not shows on the screen but form will be updated, but in the case of defaultvalue writing to the input form will be visible instantly as well as form update also just works fine.
