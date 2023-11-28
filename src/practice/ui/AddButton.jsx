export default function AddButton({ loading = false, children, ...props }) {
  return (
    <div>
      <button {...props}>
        {loading ? "🔄" : ""} {children}
      </button>
    </div>
  );
}
