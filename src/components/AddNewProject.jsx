import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";

export default function NewProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    project_name: "",
    start_date: "",
    end_date: "",
    status_id: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await api.post("/admin/projects", form);
      navigate("/dashboard"); // redirect to projects list after success
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      }
      setLoading(false); // stop loader on error
    }
  };

  if (loading) return <Loader />; // ✅ show loader while saving

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Project Name</label>
          <input
            type="text"
            name="project_name"
            value={form.project_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.project_name && (
            <p className="text-red-500 text-sm">{errors.project_name[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.start_date && (
            <p className="text-red-500 text-sm">{errors.start_date[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.end_date && (
            <p className="text-red-500 text-sm">{errors.end_date[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status_id"
            value={form.status_id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select status</option>
            <option value="1">Pending</option>
            <option value="2">In Process</option>
            <option value="3">Completed</option>
            <option value="4">Hold</option>
          </select>
        </div>

        <div className="flex justify-end">
            <button
          type="submit"
          className="bg-blue-600 text-white px-2 py-1.5 rounded hover:bg-blue-700"
        >
          Save Project
        </button>
        </div>
      </form>
    </div>
  );
}
