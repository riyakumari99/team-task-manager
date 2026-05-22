import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getTasks } from "../services/task";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
    }
  }, []);

  // FETCH TASKS
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks();

        // ROLE BASED FILTER
        if (role === "Admin") {
          setTasks(res.data);
        } else {
          setTasks(res.data.filter(t => t.assignedTo === user.id));
        }
      } catch (err) {
        console.log("ERROR FETCHING TASKS:", err);
      }
    };

    fetchTasks();
  }, []);

  // STATS
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />

      <h1>Dashboard 🚀</h1>

      <p>Welcome: {user?.name}</p>
      <p>Role: {role}</p>

      {/* STATS CARDS */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ padding: "10px", border: "1px solid black" }}>
          Total Tasks: {totalTasks}
        </div>

        <div style={{ padding: "10px", border: "1px solid black" }}>
          Completed: {completedTasks}
        </div>

        <div style={{ padding: "10px", border: "1px solid black" }}>
          Pending: {pendingTasks}
        </div>
      </div>

      {/* TASK PREVIEW */}
      <div style={{ marginTop: "30px" }}>
        <h3>Recent Tasks</h3>

        <ul>
          {tasks.slice(0, 5).map((task) => (
            <li key={task.id}>
              {task.title} -{" "}
              <b>{task.completed ? "Done" : "Pending"}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}