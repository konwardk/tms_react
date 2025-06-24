import { useState} from 'react';
import Projects from '../components/Projects';
import Users from '../components/Users';
import Tasks from '../components/Tasks';

export default function Navigation() {
  const [view, setView] = useState(null); // 'users' or 'projects'

  return (
 <>
     <div className="p-2">
    {/* Toggle Buttons */}
    <div className="mb-6 flex bg-slate-400">
      <button
        onClick={() => setView('users')}
        className={`px-5 py-2 text-sm font-medium border transition-all duration-300 ${
          view === 'users'
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
        }`}
      >
        Show Users
      </button>

      <button
        onClick={() => setView('projects')}
        className={`px-5 py-2 text-sm font-medium border transition-all duration-300 ${
          view === 'projects'
            ? 'bg-green-600 text-white border-green-600'
            : 'bg-white text-green-600 border-green-600 hover:bg-green-50'
        }`}
      >
        Show Projects
      </button>
      <button
        onClick={() => setView('tasks')}
        className={`px-5 py-2 text-sm font-medium border transition-all duration-300 ${
          view === 'tasks'
            ? 'bg-orange-600 text-white border-orange-600'
            : 'bg-white text-orange-600 border-orange-600 hover:bg-orange-50'
        }`}
      >
        Tasks
      </button>
    </div>

    {/* Conditional Views */}
    {view === 'users' && <Users />}
    {view === 'projects' && <Projects />}
    {view === 'tasks' && <Tasks />}
  </div>
 </>
);
}
