export default function AddTodoForm({ onAdd }) {
  function handleSubmit(event) {
    event.preventDefault();
    const input = event.target.elements.text;
    const text = input.value.trim();
    if (text) {
      onAdd(text);
      input.value = "";
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input name="text" placeholder="Add a todo…" />
      <button type="submit">Add</button>
    </form>
  );
}