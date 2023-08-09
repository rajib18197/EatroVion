import { useState } from "react";
import Logo from "./Logo.jsx";
import Form from "./Form.jsx";
import PackingList from "./PackingList.jsx";
import Stats from "./Stats.jsx";

export default function App() {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState({});

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
    setQuantity("");
    setDescription("");
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function onEditItem(item) {
    setEditItem(item);
    setQuantity(item.quantity);
    setDescription(item.description);
    // setItems((items) => {
    //   return items.map((item) => {
    //     if (item.id === id) {
    //       setDescription(item.description);
    //       setQuantity(item.quantity);
    //       return { ...item, isEditing: true };
    //     }

    //     return { ...item };
    //   });
    // });
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form
        onAddItems={handleAddItems}
        description={description}
        onSetDescription={setDescription}
        quantity={quantity}
        items={items}
        onSetItems={setItems}
        onSetQuantity={setQuantity}
        editItem={editItem}
        normalizeEditItem={setEditItem}
      />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
        onEditItem={onEditItem}
        // onEdit={setEditItem}
      />
      <Stats items={items} />
    </div>
  );
}
