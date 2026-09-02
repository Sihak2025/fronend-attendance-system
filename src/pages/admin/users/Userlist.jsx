/** @format */

import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../../service/userService';
import AdminSidebar from '../../../components/AdminSidebar';
import { Link } from 'react-router-dom';

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        alert('Failed to delete user');
        console.error(err);
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <AdminSidebar />
      <div className='flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8 lg:ml-64'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4'>
            <div>
              <h2 className='text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight'>
                Manage Users
              </h2>
              <p className='text-xs sm:text-sm text-gray-500 mt-1'>
                Manage User and Role
              </p>
            </div>
            <div className='w-full md:w-72'>
              <input
                type='text'
                placeholder='Search by Name or Email....'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50/75'>
                  <tr>
                    <th className='px-4 sm:px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                      ID
                    </th>
                    <th className='px-4 sm:px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                      User Name
                    </th>
                    <th className='px-4 sm:px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                      Email
                    </th>
                    <th className='px-4 sm:px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                      Role
                    </th>
                    <th className='px-4 sm:px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100 bg-white'>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr
                        key={user.id}
                        className='hover:bg-gray-50/50 transition-colors'>
                        <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium'>
                          {index + 1}
                        </td>

                        <td className='px-4 sm:px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-semibold text-gray-900'>
                            {user.name}
                          </div>
                        </td>

                        <td className='px-4 sm:px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-500'>
                            {user.email}
                          </div>
                        </td>

                        <td className='px-4 sm:px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                              user.role === 'admin'
                                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className='px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                          <div className='flex items-center justify-end gap-2 sm:gap-3'>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className='text-red-600 hover:text-red-900 font-medium text-xs bg-red-50 px-2.5 py-1.5 sm:px-3 rounded-lg transition hover:bg-red-100'>
                              Delete
                            </button>
                            <Link to={`/user/userupdate/${user.id}`}>
                              <button className='text-indigo-600 hover:text-indigo-900 font-medium text-xs bg-indigo-50 px-2.5 py-1.5 sm:px-3 rounded-lg transition hover:bg-indigo-100'>
                                Edit
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan='5'
                        className='px-6 py-12 text-center text-sm text-gray-400'>
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
