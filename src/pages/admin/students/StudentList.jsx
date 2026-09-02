/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react';
import AdminSidebar from '../../../components/AdminSidebar';
import { getStudents, deleteStudent } from '../../../service/studentService';

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudent] = useState([]);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const data = await getStudents();
      setStudent(data);
    } catch (error) {
      console.error('Get all student error', error);
    }
  };

  const deleteStudents = async (id) => {
    if (!confirm('Do you want to delete this student?')) {
      return;
    }
    try {
      await deleteStudent(id);
      fetchStudent();
    } catch (error) {
      console.error('Delete student error', error);
    }
  };
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm),
  );

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 ml-64 p-10 max-w-7xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
              Student Management
            </h1>
            <p className='text-sm text-slate-500 mt-1'>
              Manage student profiles, personal information, and contacts.
            </p>
          </div>
          <Link
            to='/student/studentcreate'
            className='inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition-all duration-200'>
            <Plus size={18} />
            <span>Add New Student</span>
          </Link>
        </div>
        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
          <div className='p-6 border-b border-slate-100 flex items-center justify-between gap-4'>
            <div className='relative w-full max-w-md'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                <Search size={18} />
              </span>
              <input
                type='text'
                placeholder='Search by name or phone number...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
              />
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-slate-50/75 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500'>
                  <th className='py-4 px-6'>Student</th>
                  <th className='py-4 px-6'>Room_Name</th>
                  <th className='py-4 px-6'>Gender</th>
                  <th className='py-4 px-6'>Date of Birth</th>
                  <th className='py-4 px-6'>Phone</th>
                  <th className='py-4 px-6'>Address</th>
                  <th className='py-4 px-6 text-right'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100 text-sm text-slate-600'>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className='hover:bg-slate-50/50 transition-colors'>
                      <td className='py-4 px-6 flex items-center gap-3'>
                        {student.image ? (
                          <img
                            src={`http://127.0.0.1:8000/storage/${student.image}`}
                            alt={student.name}
                            className='w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm'
                          />
                        ) : (
                          <div className='w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold'>
                            {student.name.charAt(0)}
                          </div>
                        )}
                        <span className='font-semibold text-slate-800'>
                          {student.name}
                        </span>
                      </td>
                      <td className='py-4 px-6'>{student.room?.room_name}</td>
                      <td className='py-4 px-6'>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                            student.gender === 'Male'
                              ? 'bg-blue-50 text-blue-600 border border-blue-100'
                              : 'bg-pink-50 text-pink-600 border border-pink-100'
                          }`}>
                          {student.gender}
                        </span>
                      </td>
                      <td className='py-4 px-6'>
                        <span className='inline-flex items-center gap-1.5 text-slate-600'>
                          <Calendar
                            size={15}
                            className='text-slate-400'
                          />
                          {student.dob}
                        </span>
                      </td>
                      <td className='py-4 px-6'>
                        <span className='inline-flex items-center gap-1.5 text-slate-600'>
                          <Phone
                            size={15}
                            className='text-slate-400'
                          />
                          {student.phone}
                        </span>
                      </td>
                      <td className='py-4 px-6'>
                        <span className='inline-flex items-center gap-1.5 text-slate-600'>
                          <MapPin
                            size={15}
                            className='text-slate-400'
                          />
                          {student.address}
                        </span>
                      </td>
                      <td className='py-4 px-6 text-right space-x-2'>
                        <Link
                          to={`/student/studentupdate/${student.id}`}
                          className='inline-flex p-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg border border-slate-200 transition-all'>
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => deleteStudents(student.id)}
                          className='inline-flex p-2 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg border border-slate-200 transition-all'>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan='7'
                      className='text-center py-8 text-slate-400'>
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentList;