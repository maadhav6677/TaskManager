import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const res = await API.get("/tasks");

      setTasks(res.data.data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to load tasks"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadTasks = async () => {
      try {
        const res = await API.get("/tasks");

        if (isMounted) {
          setTasks(res.data.data);
          setErrorMessage("");
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error.response?.data?.message ||
              "Failed to load tasks"
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", form);

      setForm({
        title: "",
        description: "",
      });

      fetchTasks();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create task"
      );
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      fetchTasks();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete task"
      );
    }
  };

  const toggleStatus = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        status:
          task.status === "pending"
            ? "completed"
            : "pending",
      });

      fetchTasks();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update task status"
      );
    }
  };

  const editTask = async (task) => {
    const newTitle = prompt(
      "Enter new title",
      task.title
    );

    if (newTitle === null) {
      return;
    }

    const newDescription = prompt(
      "Enter new description",
      task.description || ""
    );

    if (newDescription === null) {
      return;
    }

    const title = newTitle.trim();
    const description = newDescription.trim();

    if (!title) {
      alert("Title is required");
      return;
    }

    try {
      await API.put(`/tasks/${task._id}`, {
        title,
        description,
      });

      fetchTasks();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to update task"
      );
    }
  };

  return (
    <div className="container">
      <h2>Task Dashboard</h2>

      <button
  onClick={() => {
    localStorage.clear();
    window.location.href = "/";
  }}
>
  Logout
</button>

      <hr />

      <form onSubmit={createTask}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <button type="submit">
          Create Task
        </button>
      </form>

      <hr />

      {errorMessage && (
        <p className="error">
          {errorMessage}
        </p>
      )}

      {isLoading && (
        <p>Loading tasks...</p>
      )}

      {!isLoading && tasks.length === 0 && !errorMessage && (
        <p>No tasks yet.</p>
      )}

      {!isLoading && tasks.map((task) => (
        <div
          key={task._id}
          className="card"
        >
          <h4>{task.title}</h4>

          <p>{task.description}</p>

          <p>
  Status:
  {" "}
  {task.status === "completed"
    ? "✅ Completed"
    : "⏳ Pending"}
</p>

          <button
            onClick={() =>
              toggleStatus(task)
            }
          >
            Toggle Status
          </button>

          <button
            onClick={() =>
              editTask(task)
            }
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteTask(task._id)
            }
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
