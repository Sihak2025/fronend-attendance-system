/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getMyClasses,
  deleteTeacherClass,
} from '../../../service/teacherClassService';
import AdminSidebar from '../../../components/AdminSidebar';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherClassList = () => {
  const navigate = useNavigate();
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeacherClasses = async () => {
    try {
      setLoading(true);
      const data = await getMyClasses();
      setTeacherClasses(data || []);
    } catch (err) {
      setError('Failed to fetch teacher classes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherClasses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await deleteTeacherClass(id);
        fetchTeacherClasses();
      } catch (err) {
        alert('Failed to delete teacher class.');
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      <AdminSidebar />
      <div className='flex-1 ml-72 p-8 max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-gray-800'>
              Teacher Classes
            </h1>
            <p className='text-xs text-gray-500 mt-1'>
              Manage teacher and class assignments
            </p>
          </div>

          <Link to='/teacherclasslist/teacherclasscreate'>
            <button className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-md transition-all'>
              <Plus size={16} />
              <span>Create Teacher Class</span>
            </button>
          </Link>
        </div>
        {error && (
          <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-xs'>
            {error}
          </div>
        )}

        <div className='bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  ID
                </th>
                <th className='px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  User ID
                </th>
                <th className='px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  Teacher ID
                </th>
                <th className='px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  Room ID
                </th>
                <th className='px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  Subject ID
                </th>
                <th className='px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  Schedule ID
                </th>
                <th className='px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  Total Students
                </th>
                <th className='px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {teacherClasses.map((item) => (
                <tr
                  key={item.id}
                  className='hover:bg-gray-50/50 transition-colors'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {item.id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {item.user_id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {item.teacher_id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {item.room_id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {item.subject_id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {item.schedule_id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {item.total_student}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                    <div className='flex items-center justify-end gap-2'>
                      <button
                        onClick={() =>
                          navigate(`/teacherclass/teacherclassupdate/${item.id}`)
                        }
                        className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 text-xs font-semibold transition-all'>
                        <Pencil size={14} />
                        <span>Update</span>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 text-xs font-semibold transition-all'>
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {teacherClasses.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan='8'
                    className='px-6 py-8 text-center text-sm text-gray-500'>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassList;
