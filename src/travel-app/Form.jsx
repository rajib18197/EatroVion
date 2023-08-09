import { useState } from "react";

export default function Form({
  description,
  onSetDescription,
  quantity,
  onSetQuantity,
  onAddItems,
  items,
  onSetItems,
  editItem,
  normalizeEditItem,
}) {
  const isEditSession = Boolean(editItem.id);
  console.log(isEditSession);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    // const isEditItem = items.find((item) => item.isEditing);
    if (isEditSession) {
      onSetItems((items) =>
        items.map((item) => {
          if (item.id === editItem.id) {
            return {
              ...item,
              description: description,
              quantity: quantity,
            };
          }

          return { ...item };
        })
      );

      onSetDescription("");
      onSetQuantity("");
      normalizeEditItem({});
      return;
    }
    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => onSetQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => onSetDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
