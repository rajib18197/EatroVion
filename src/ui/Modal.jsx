import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens, children }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: (e) => {
      e.preventDefault();
      open(opens);
    },
  });
}

function Window({ opens, children }) {
  const { openName, close } = useContext(ModalContext);

  if (openName !== opens) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div>{cloneElement(children, { onClose: () => close() })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
