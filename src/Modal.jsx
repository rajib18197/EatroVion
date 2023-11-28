import { cloneElement } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const [value, setValue] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, open, close, value, setValue }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open, value } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opens), value });
}

function Window({ children, windowName }) {
  const { openName, close, value, setValue } = useContext(ModalContext);
  console.log(openName, windowName);
  if (openName !== windowName) return;

  return (
    <div>
      <div>
        <button onClick={close}>&times;</button>
        <div>
          {cloneElement(children, {
            onClick: close,
            value,
            onValueChange: setValue,
          })}
        </div>
      </div>
    </div>
  );
}

Modal.Open = Open;
Modal.Window = Window;
