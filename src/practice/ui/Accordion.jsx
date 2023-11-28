import { useState } from "react";
import { useGetAllSubjectsByStudentQuery } from "../store/api/studentsApi";

export default function Accordion({ header, children }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((open) => !open);
  }

  return (
    <div className="header">
      <div className="header__info">
        {header}
        <div>
          <button onClick={handleClick}>{isOpen ? "🔽" : "◀"}</button>
        </div>
      </div>

      {isOpen && children}
    </div>
  );
}
