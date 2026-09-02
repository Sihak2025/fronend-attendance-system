/** @format */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../../../service/userService';
import AdminSidebar from '../../../components/AdminSidebar';

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'admin',
    password: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const data = await getUserById(id);
      setFormData({
        name: data.name || '',
        email: data.email || '',
        role: data.role || 'user',
        password: '',
      });
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch user details', err);
      setError('Failed to load user data');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!payload.password) {
        delete payload.password;
      }

      await updateUser(id, payload);
      navigate('/userlist');
    } catch (err) {
      console.error('Failed to update user', err);
      setError('Failed to update user. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className='flex min-h-screen bg-gray-50 items-center justify-center'>
        <p className='text-gray-500 text-sm'>Loading user details...</p>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <AdminSidebar />
      <div className='flex-1 p-8 overflow-y-auto ml-64'>
        <div className='max-w-3xl mx-auto'>
          <div className='mb-8'>
            <h2 className='text-2xl font-extrabold text-gray-900 tracking-tight'>
              Edit User
            </h2>
            <p className='text-sm text-gray-500 mt-1'>
              Update user account details and role permissions
            </p>
          </div>

          {error && (
            <div className='mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm'>
              {error}
            </div>
          )}

          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
            <form
              onSubmit={handleSubmit}
              className='space-y-6'>
              <div>
                <label className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2'>
                  User Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='Enter user name'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2'>
                  Email Address
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='Enter email address'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2'>
                  Role
                </label>
                <select
                  name='role'
                  value={formData.role}
                  onChange={handleChange}
                  className='w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'>
                  <option value='admin'>Admin</option>
                  <option value='teacher'>Teacher</option>
                </select>
              </div>

              <div>
                <label className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2'>
                  New Password{' '}
                  <span className='text-gray-400 font-normal'>
                    (Leave blank to keep current)
                  </span>
                </label>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='••••••••'
                />
              </div>

              <div className='flex items-center justify-end gap-4 pt-4 border-t border-gray-100'>
                <button
                  type='button'
                  onClick={() => navigate(-1)}
                  className='px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition'>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
