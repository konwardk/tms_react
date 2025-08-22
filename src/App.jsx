import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import LogoutHandler from "./components/LogoutHandler";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Guest from "./components/Guest";
import PrivateRoute from "./components/PrivateRoute";
import Projects from "./components/Projects";
import AddNewProject from "./components/AddNewProject";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <main className="flex-grow p-4 bg-gray-100">
        <Routes>
          <Route path="/" element={<Guest />} />
          <Route path="/login" element={<Login />} />

          {/* Protect dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/projects" element={
            <PrivateRoute><Projects /></PrivateRoute>
            } />
          <Route path="/admin/projects/create" element={
            <PrivateRoute><AddNewProject /></PrivateRoute>
            } />

          <Route path="/logout" element={<LogoutHandler />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
