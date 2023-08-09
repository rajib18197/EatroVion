export default function Item({ item, onDeleteItem, onToggleItem, onEditItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
      <button style={{ color: "white" }} onClick={() => onEditItem(item)}>
        Edit
      </button>
    </li>
  );
}
