/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, DoorOpen } from 'lucide-react';
import AdminSidebar from '../../../components/AdminSidebar';
import { getSubjects, deleteSubject } from '../../../service/subjectService';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(data);
    } catch (error) {
      console.error('Get all Subject error', error);
    }
  };

  const deleteSubjects = async (id) => {
    if (!window.confirm('Do you want to delete this subject?')) {
      return;
    }
    try {
      await deleteSubject(id);
      fetchSubjects();
    } catch (error) {
      console.error('Delete subject error', error);
    }
  };

  // កែតម្រូវត្រង់នេះដោយបន្ថែម return ដើម្បីឱ្យការ Filter ដំណើរការបានត្រឹមត្រូវ
  const filteredSubjects = subjects.filter((subject) => {
    return subject.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 ml-64 p-10 max-w-7xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
              Subject Management
            </h1>
            <p className='text-sm text-slate-500 mt-1'>
              Manage subjects, credits, and descriptions.
            </p>
          </div>
          <Link
            to='/subject/subjectcreate'
            className='inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition-all duration-200'>
            <Plus size={18} />
            <span>Add New Subject</span>
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
                placeholder='Search by subject name...'
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
                  <th className='py-4 px-6'>Id</th>
                  <th className='py-4 px-6'>Subject Name</th>
                  <th className='py-4 px-6'>Credit</th>
                  <th className='py-4 px-6'>Description</th>
                  <th className='py-4 px-6 text-right'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100 text-sm text-slate-600'>
                {filteredSubjects.length > 0 ? (
                  filteredSubjects.map((subject) => (
                    <tr
                      key={subject.id}
                      className='hover:bg-slate-50/50 transition-colors'>
                      <td className='py-4 px-6 font-medium text-slate-400'>
                        {subject.id}
                      </td>
                      <td className='py-4 px-6 font-semibold text-slate-800 flex items-center gap-2.5'>
                        <span className='p-2 bg-blue-50 text-blue-600 rounded-lg'>
                          <DoorOpen size={16} />
                        </span>
                        {subject.name}
                      </td>
                      <td className='py-4 px-6'>{subject.credit}</td>
                      <td className='py-4 px-6'>{subject.description}</td>
                      <td className='py-4 px-6 text-right space-x-2'>
                        <Link
                          to={`/subject/subjectupdate/${subject.id}`}
                          className='inline-flex p-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg border border-slate-200 transition-all'>
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => deleteSubjects(subject.id)}
                          className='inline-flex p-2 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg border border-slate-200 transition-all'>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan='5'
                      className='text-center py-8 text-slate-400'>
                      No subjects found.
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

export default SubjectList;