const { useState } = React;

function TodoItem({ task, onDelete }) {
    return (
        <li className="todo-item">
            <span>{task}</span>
            <button
                className="delete-button"
                onClick={onDelete}
            >
                Delete
            </button>
        </li>
    );
}

function TodoList({ tasks, onDelete }) {
    if (tasks.length === 0) {
        return <p className="empty">No tasks added yet.</p>;
    }

    return (
        <ul className="todo-list">
            {tasks.map((task, index) => (
                <TodoItem
                    key={index}
                    task={task}
                    onDelete={() => onDelete(index)}
                />
            ))}
        </ul>
    );
}

function App() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    function addTask() {
        if (task.trim() === "") {
            return;
        }

        setTasks([...tasks, task]);
        setTask("");
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    return (
        <div className="container">
            <h1>React To-Do List</h1>

            <div className="todo-input">
                <input
                    type="text"
                    placeholder="Enter a task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addTask();
                        }
                    }}
                />

                <button onClick={addTask}>
                    Add Task
                </button>
            </div>

            <TodoList
                tasks={tasks}
                onDelete={deleteTask}
            />
        </div>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(<App />);
