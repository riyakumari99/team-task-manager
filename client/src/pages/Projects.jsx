import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProjects, createProject } from "../services/project";

export default function Projects() {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);

  // load projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        setProjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProjects();
  }, []);

  // add project
  const addProject = async () => {
    if (!name.trim()) return;

    try {
      const res = await createProject({ name });

      setProjects([...projects, res.data]);

      setName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />

      <h2>Projects</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
      />

      <button onClick={addProject}>Add Project</button>

      <ul>
        {projects.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}