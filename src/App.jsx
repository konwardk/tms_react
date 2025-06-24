import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Topbar from './components/Topbar';
import Footer from './components/Footer'; // ✅ Add your Footer component
import LogoutHandler from './components/LogoutHandler'; // ✅ Add your Footer component
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import Guest from './components/Guest';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar stays fixed at the top */}
      <Topbar />

      {/* Main content grows to fill space between topbar and footer */}
      <main className="flex-grow p-4 bg-gray-100">
        <Routes>
          <Route path="/" element={<Guest />} />        {/* 👈 Default Guest Page */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<LogoutHandler />}/>

        </Routes>

      </main>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
}
