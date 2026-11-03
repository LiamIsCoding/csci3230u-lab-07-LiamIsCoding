# Lab 07 - React: components, props & state

The first of four React labs. Together they build a to-do app:

| Lab | You add | Topic |
|-----|---------|-------|
| 07 | components + state | components, props, state, events, lists |
| 08 | a controlled form + filters | forms, derived state |
| 09 | a `useTodos` hook + routing | state management, React Router |
| 11 | loading from a server | effects, fetching, async state |

This week you turn a static list into a live to-do app: add items, check them off, delete them, and show a count that updates itself. The starter is a working React project that already renders the todos - your job is to make it interactive.

## Getting your copy of the starter repo

The starter for this lab is a **template repository** on GitHub (the link is on Canvas). Make your own copy of it - work in *your* copy, never in the template:

1. Open the template repo and click **Use this template → Create a new repository**.
2. Name it `csci3230u-lab-07-<your-github-username>`, set the visibility to **Private**, and create it.
3. Add your **lab instructor (TA)** and the **course instructor** as collaborators (**Settings → Collaborators and teams → Add people**) - your work cannot be marked if they cannot see it.
4. Clone your new copy and work there:

   ```bash
   git clone <your-repo-url>
   cd <your-repo-dir>
   ```

## The starter

A ready-to-run Vite + React project. The list renders from a hard-coded array; no dynamic behaviour yet.

| File | State |
|------|-------|
| `src/App.jsx` | currently a static `const todos`; you add state, handlers, and a count |
| `src/TodoList.jsx` | maps the array to `<TodoItem>`s with a stable `key` (the "render a list" pattern) |
| `src/TodoItem.jsx` | shows the todo, but the checkbox/delete aren't wired yet (you wire them) |
| `src/App.test.jsx` | 5 tests describing what the app must do. Don't edit them - make them pass |
| `main.jsx`, `index.css`, `index.html` | the React scaffold - do not modify |

```bash
npm install      # one time
npm run dev      # play with it at the URL it prints
npm test         # the 5 tests - you start at 1 passing
```

You'll begin at 1 / 5 (the list renders). Make the other four go green.

## Requirements - make `src/App.jsx` live

The data is an array of `{ id, text, done }`. Work through the steps marked in `App.jsx`:

1. **Hold the todos in state.** Swap the `const todos = …` for React state so it can change:

   ```jsx
   import { useState } from "react";
   const [todos, setTodos] = useState(INITIAL_TODOS);
   ```

2. **Write three handlers - and never mutate state.** Build a *new* array each time and hand it to `setTodos`:
   - `addTodo(text)` - append `{ id, text, done: false }` with a fresh `id` (`[...todos, …]`).
   - `toggleTodo(id)` - `todos.map(t => t.id === id ? { ...t, done: !t.done } : t)`.
   - `deleteTodo(id)` - `todos.filter(t => t.id !== id)`.

   Pass them down as props: `onToggle={toggleTodo}`, `onDelete={deleteTodo}` to `<TodoList>`.

3. **Create `src/AddTodoForm.jsx`** and render it as `<AddTodoForm onAdd={addTodo} />`. Keep the input uncontrolled for now (controlled inputs are in a later lab): on submit, read the value, call `onAdd`, then clear it.

   ```jsx
   function handleSubmit(event) {
     event.preventDefault();
     const input = event.target.elements.text;
     // …call onAdd with input.value (trimmed), then input.value = ""
   }
   // <form onSubmit={handleSubmit}>: an <input name="text" placeholder="Add a todo…"> + an "Add" button
   ```

4. **Wire `src/TodoItem.jsx`** - the checkbox calls `onToggle(todo.id)` (replace `readOnly` with `onChange`); the delete button calls `onDelete(todo.id)`.

5. **Show a derived count** in `App` - `"{done} of {total} done"`. **Derive** it from `todos` (`todos.filter(t => t.done).length`); don't keep it in its own state.

## The big ideas

- **Components + props** - small functions that take props and return JSX. Data flows down as props; events flow up as callback props (`onToggle`, `onAdd`)
- **State drives the UI** - you change `todos` with `setTodos`, and React re-renders
- **Immutability** - make new arrays/objects; mutating state in place won't re-render and causes bugs
- **Keys** - a stable `key` per list item lets React update efficiently
- **Derived state** - compute what you can (the count) instead of storing it

## Quality bar (this is graded)

- **All 5 tests pass** (`npm test` → no failures)
- **No mutation** - handlers build new arrays (`map` / `filter` / spread), never `todos.push(...)` or `todo.done = …`
- **Derived count** - computed from `todos`, not stored in a second `useState`

## How you're graded

- **Automated:** `npm test` (Vitest + React Testing Library) - all five pass
- **By rubric:** immutable updates, a stable `key`, and a derived (not stored) count

## Reflection (a short note in the repo)

In the Sudoku Lab 05 you cleared and rebuilt the board's DOM by hand on every move. Here you just changed an array and React did the rest. **Write a sentence or two on that difference** - it's the whole point of a component framework.

## How to submit

Commit and **push to `origin`** (don't commit `node_modules/` - the `.gitignore` handles it). The graded state is whatever is on `main`.

However, since lab marks do sometimes go missing, I would encourage everyone to submit the URL of their repository to Canvas as the submission for this lab assignment (and for all other labs).  If there are any lab mark discrepancies, at least we have your submission to re-mark it.

> **AI policy:** this lab is hand-coded. You may ask an AI assistant to explain a React concept or interpret a failing test, but write the components yourself. In the next lab you will be permitted to use an AI *agent* to generate code. See `project/ai-policy.md`.
