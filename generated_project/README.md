# SimpleTodoApp

**SimpleTodoApp** is a lightweight, vanilla‑JavaScript todo list that runs entirely in the browser.  It lets users add, complete, delete, and filter tasks, with all data persisted in `localStorage`.  The UI is responsive and works on both desktop and mobile devices without any build step or external dependencies.

---

## Tech Stack
- **HTML** – markup for the app structure.
- **CSS** – custom styling (including responsive layout) defined in `style.css`.
- **JavaScript** – core functionality in `app.js` (no frameworks or libraries).

---

## Features
- **Add tasks** – type a description and press **Add** or *Enter*.
- **Mark as completed** – click the checkbox to toggle the completed state.
- **Delete tasks** – click the ✕ button to remove a todo.
- **Filter view** – switch between **All**, **Active**, and **Completed** tasks.
- **Persistent storage** – todos are saved to `localStorage` and restored on page reload.
- **Responsive design** – layout adapts to mobile screens and desktop browsers.

---

## Setup
1. **Clone or download** the repository:
   ```bash
   git clone https://github.com/your‑username/simple-todo-app.git
   # or download the ZIP from GitHub and extract it
   ```
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari, etc.).
   - No npm, bundlers, or server is required – the app runs completely client‑side.

---

## Usage
1. **Add a todo**
   - Type a task into the input field at the top.
   - Press **Add** or hit the **Enter** key.
2. **Complete a todo**
   - Click the square checkbox next to a task.  A checkmark appears and the text is struck‑through.
3. **Delete a todo**
   - Click the ✕ button on the right side of a task.
4. **Filter tasks**
   - Use the **All**, **Active**, or **Completed** buttons at the bottom to change the list view.
5. **Data persistence**
   - All changes are automatically saved to `localStorage`.  Closing and reopening the page restores the list exactly as you left it.

---

## Responsive Design
The UI is built with flexible containers and media queries.  On screens narrower than 600 px the layout stacks vertically, buttons expand to full width, and font sizes adjust for comfortable touch interaction.

---

## File Overview
| File | Description |
|------|-------------|
| `index.html` | Main HTML page – defines the structure of the todo app and loads the CSS and JavaScript files. |
| `style.css` | All styling for the calculator (original) and the todo app, including responsive breakpoints. |
| `app.js` | Vanilla‑JS logic handling CRUD operations, filtering, rendering, and `localStorage` persistence. |
| `README.md` | This documentation file – provides project overview, setup, usage, and other helpful information. |

---

## License
[Insert license information here – e.g., MIT License]

---

## Screenshot
![App screenshot](screenshot.png)
