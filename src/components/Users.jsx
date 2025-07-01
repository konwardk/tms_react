import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { Search, Edit, Trash2 } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get(`/admin/users?page=${currentPage}`)
      .then(response => {
        const { data, current_page, last_page } = response.data.data;
        setUsers(data);
        setPagination({current_page, last_page});
        setLoading(false);
      })
      .catch(error => {
        console.error('Unauthorized or error fetching users:', error);
        setLoading(false);
      });
  }, [currentPage]);

  if (loading) return <Loader />;

  return (
    <>
      <div className="p-6 bg-white shadow rounded-md">
      <div className="header flex gap-2 justify-between items-center mb-4">
      <div className="text-2xl flex gap-2 font-semibold text-slate-800">
        <svg className='mt-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>
        </svg>
        <span className='text-sm'>Users</span>
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

      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{user.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.role_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 flex gap-2">
                    <Edit className='w-5 h-5'/>
                    <Trash2 className='w-5 h-5'/> 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination 
            currentPage={pagination.current_page}
            lastPage={pagination.last_page}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      ) : (
        <div className="text-center text-gray-600 py-8">
          No users found.
        </div>
      )}
    </div>
    </>
  );
}
