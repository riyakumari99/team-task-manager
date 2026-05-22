import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/task";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // FETCH TASKS
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await getTasks();

      if (role === "Admin") {
        setTasks(res.data);
      } else {
        setTasks(res.data.filter(t => t.assignedTo === user.id));
      }
    };

    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {
    if (!title.trim()) return;

    const res = await createTask({
      title,
      projectId,
      assignedTo,
      dueDate,
    });

    setTasks([...tasks, res.data]);
  };

  // UPDATE STATUS
  const updateStatus = async (task, status) => {
    const res = await updateTask(task.id, {
      ...task,
      status,
    });

    setTasks(tasks.map(t => t.id === task.id ? res.data : t));
  };

  // DELETE TASK
  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  // OVERDUE TASKS
  const overdueTasks = tasks.filter(
    t =>
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== "done"
  );

  return (
    <div>
      <Navbar />

      <h2>Tasks ({role})</h2>

      {/* ADMIN FORM */}
      {role === "Admin" && (
        <div>
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select onChange={(e) => setProjectId(e.target.value)}>
            <option>Select Project</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select onChange={(e) => setAssignedTo(e.target.value)}>
            <option>Assign User</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <input type="date" onChange={(e) => setDueDate(e.target.value)} />

          <button onClick={addTask}>Create Task</button>
        </div>
      )}

      {/* TASK LIST */}
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <b>{t.title}</b> - {t.status}

            <button onClick={() => updateStatus(t, "in-progress")}>
              Start
            </button>

            <button onClick={() => updateStatus(t, "done")}>
              Done
            </button>

            {role === "Admin" && (
              <button onClick={() => handleDelete(t.id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* OVERDUE SECTION */}
      <h3>Overdue Tasks</h3>
      <ul>
        {overdueTasks.map(t => (
          <li key={t.id}>
            {t.title} (Overdue)
          </li>
        ))}
      </ul>
    </div>
  );
}