import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Loader from '../components/Loader';
import { Search, Edit, Trash2} from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/projects')
      .then(response => {
        setProjects(response.data.data.data); // Nested pagination response
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
        <div className="header flex justify-between items-center mb-4">
        <h2 className="text-2xl flex gap-2 font-semibold text-slate-800"><svg className='mt-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panels-top-left-icon lucide-panels-top-left"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>Project List</h2>

        {/* Search input with icon */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-1 border-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Project Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Start Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">End Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Created By</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {projects.map(project => {
                let statusColor = '';
                const safeStatus = String(project.status || '').toLowerCase();

                switch (safeStatus) {
                  case 'pending':
                    statusColor = 'text-yellow-500';
                    break;
                  case 'completed':
                    statusColor = 'text-green-800';
                    break;
                  case 'in process':
                    statusColor = 'text-orange-800';
                    break;
                  case 'hold':
                    statusColor = 'text-red-800';
                    break;
                  default:
                    statusColor = 'text-gray-600';
                }

                return (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{project.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{project.project_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{project.start_date}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{project.end_date}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{project.created_by}</td>
                    <td className={`px-6 py-4 text-sm font-bold ${statusColor}`}>
                      {project.status}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 flex gap-2 mt-2">
                    <Edit className='w-5 h-5'/>
                    <Trash2 className='w-5 h-5'/> 
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-600 py-8">No projects found.</div>
      )}
    </div>
    </>
  );
}
