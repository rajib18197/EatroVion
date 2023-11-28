import Modal from "./Modal";

export default function Search() {
  return (
    <Modal>
      <Modal.Open opens={"book"}>
        <Box />
      </Modal.Open>
      <Modal.Window windowName={"book"}>
        <Cities />
      </Modal.Window>
    </Modal>
  );
}

function Box({ value, onClick }) {
  return (
    <div onClick={onClick}>
      <span>Icon</span>
      <div>
        <h4>Departure City</h4>
        <p>
          {value.name}, {value.code}
        </p>
      </div>
    </div>
  );
}

function Cities({ value, onValueChange, onClick }) {
  const values = [
    { name: "Dubai Airport", code: "CBS" },
    { name: "Airport Airlines", code: "BCS" },
  ];
  return (
    <div>
      <input type="search" name="" id="" placeholder="search city" />
      <div>
        {values.map((val) => (
          <div
            key={val.code}
            onClick={() => {
              onValueChange(val);
              onClick();
            }}
          >
            <h4>{val.name}</h4>
            <p>{val.code}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
