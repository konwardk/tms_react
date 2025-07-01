import {useEffect, useState} from 'react'
import Loader from '../components/Loader';
import api from '../api/axios';
import { Search, Edit, Trash2} from 'lucide-react';

export default function Tasks() {
      const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    api.get('/admin/projects')
      .then(response => {
        setTasks(response.data.data.data); // Nested pagination response
        setLoading(false);
      })
      .catch(error => {
        console.error('Unauthorized or error fetching projects:', error);
        setLoading(false);
      });
  }, []);


    if (loading) return <Loader />;
    return (
      <>
      <div className="p-6 bg-white shadow rounded-md">
        <div className="header flex gap-2 justify-between items-center mb-4">
        <div className="text-2xl flex gap-2 font-semibold text-slate-800">
            <svg className='mt-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-todo-icon lucide-list-todo"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>
            </svg>
            <span className='text-sm'>Tasks</span>
        </div>
        {/* Search input with icon */}
        <div className="relative w-full sm:w-72 md:w-80 border">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border-2 rounded-sm text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
            </div>
      </div>

      {tasks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Task Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Project Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Start Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">End Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Assigned To</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Assigned By</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-600 py-8">No Tasks found.</div>
      )}
    </div>
    </>
    )
}
