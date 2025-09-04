// Todo Application Core Logic
/**
 * @typedef {Object} Todo
 * @property {string} id - Unique identifier for the todo item.
 * @property {string} text - The description of the todo.
 * @property {boolean} completed - Completion state.
 */

/**
 * In‑memory list of todos. It is populated from localStorage on start.
 * @type {Todo[]}
 */
let todos = [];
/**
 * Current filter applied to the list view. One of 'all', 'active', 'completed'.
 * @type {string}
 */
let currentFilter = 'all';

/** Load todos from localStorage and initialise the `todos` array. */
function loadTodos() {
  const raw = localStorage.getItem('todos');
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    // Ensure we have an array of objects with the required shape.
    if (Array.isArray(parsed)) {
      todos = parsed;
    } else {
      todos = [];
    }
  } catch (e) {
    console.error('Failed to parse stored todos:', e);
    todos = [];
  }
}

/** Persist the current `todos` array to localStorage. */
function saveTodos() {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (e) {
    console.error('Failed to save todos:', e);
  }
}

// ---------------------------------------------------------------------------
// DOM References – queried once after the script is loaded (deferred).
const input = document.getElementById('new-todo');
const addBtn = document.getElementById('add-btn');
const listEl = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');

/** Render the todo list according to `todos` and `currentFilter`. */
function renderTodos() {
  // Clear existing list.
  listEl.innerHTML = '';

  // Filter the todos based on the selected filter.
  const filtered = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // Build list items.
  filtered.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (todo.completed) li.classList.add('completed');
    li.dataset.id = todo.id;

    // Checkbox span – visual representation of completed state.
    const checkbox = document.createElement('span');
    checkbox.className = 'checkbox';
    if (todo.completed) checkbox.textContent = '✓';
    // Attach toggle handler.
    checkbox.addEventListener('click', () => toggleComplete(todo.id));

    // Text span.
    const textSpan = document.createElement('span');
    textSpan.className = 'text';
    textSpan.textContent = todo.text;

    // Delete button.
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.dataset.id = todo.id;
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => deleteTodo(todo.id));

    // Assemble the item. The CSS expects a .left wrapper for checkbox+text,
    // but the markup works fine without it. To stay compatible with the style
    // we create the wrapper.
    const leftDiv = document.createElement('div');
    leftDiv.className = 'left';
    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(textSpan);

    li.appendChild(leftDiv);
    li.appendChild(delBtn);
    listEl.appendChild(li);
  });

  // Update filter button UI – add .active to the current filter button.
  filterButtons.forEach(btn => {
    if (btn.dataset.filter === currentFilter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

/** Add a new todo based on the input field value. */
function addTodo() {
  const text = input.value.trim();
  if (!text) return; // ignore empty entries
  const newTodo = {
    id: Date.now().toString(),
    text,
    completed: false,
  };
  todos.push(newTodo);
  input.value = '';
  saveTodos();
  renderTodos();
}

/** Toggle the completed state of a todo identified by `id`. */
function toggleComplete(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
  saveTodos();
  renderTodos();
}

/** Delete a todo identified by `id`. */
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos();
}

/** Change the current filter and re‑render. */
function setFilter(filter) {
  if (!['all', 'active', 'completed'].includes(filter)) return;
  currentFilter = filter;
  renderTodos();
}

// ---------------------------------------------------------------------------
// Event listeners registration.
addBtn.addEventListener('click', addTodo);
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTodo();
});
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

/** Initialise the application – load persisted data and render UI. */
function init() {
  loadTodos();
  renderTodos();
}

init();
