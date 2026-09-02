/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Users,
  CalendarDays,
  Save,
  Building,
  UserCheck,
  Layers,
  Loader2,
} from 'lucide-react';
import AdminSidebar from '../../../components/AdminSidebar';
import {
  getTeacherClassById,
  updateTeacherClass,
} from '../../../service/teacherClassService';
import { getTeachers } from '../../../service/teacherService';
import { getRooms } from '../../../service/classService';
import { getUsers } from '../../../service/userService';
import { getSchedules } from '../../../service/scheduleService';
import { getSubjects } from '../../../service/subjectService';

const TeacherClassUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    user_id: '',
    teacher_id: '',
    room_id: '',
    subject_id: '',
    schedule_id: '',
    total_student: '',
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setFetchingData(true);
        const [
          teacherData,
          roomData,
          userData,
          scheduleData,
          subjectData,
          currentClassData,
        ] = await Promise.all([
          getTeachers(),
          getRooms(),
          getUsers(),
          getSchedules(),
          getSubjects(),
          getTeacherClassById(id),
        ]);

        setTeachers(teacherData || []);
        setRooms(roomData || []);
        setUsers(userData || []);
        setSchedules(scheduleData || []);
        setSubjects(subjectData || []);
        if (currentClassData) {
          setFormData({
            user_id: currentClassData.user_id || '',
            teacher_id: currentClassData.teacher_id || '',
            room_id: currentClassData.room_id || '',
            subject_id: currentClassData.subject_id || '',
            schedule_id: currentClassData.schedule_id || '',
            total_student: currentClassData.total_student || '',
          });
        }
      } catch (error) {
        console.error('Error loading update data', error);
      } finally {
        setFetchingData(false);
      }
    };

    loadInitialData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateTeacherClass(id, formData);
      navigate('/teacherclasslist');
    } catch (error) {
      console.error('Update teacher class error', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className='min-h-screen bg-slate-50 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-3'>
          <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
          <p className='text-sm font-medium text-slate-500'>
            Loading class data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 ml-110 p-10 max-w-4xl mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
              Edit Class
            </h1>
            <p className='text-sm text-slate-500 mt-1'>
              Update user, teacher, room, subject, schedule, and total students
              for this class.
            </p>
          </div>
          <Link
            to='/teacherclasslist'
            className='inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-medium px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all duration-200'>
            <ArrowLeft size={18} />
            <span>Back to List</span>
          </Link>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-8'>
          <form
            onSubmit={handleSubmit}
            className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  User Account
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <Users size={18} />
                  </span>
                  <select
                    name='user_id'
                    required
                    value={formData.user_id}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'>
                    <option value=''>Select a user account</option>
                    {users.map((user) => (
                      <option
                        key={user.id}
                        value={user.id}>
                        {user.name || user.email || `User ${user.id}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Teacher
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <UserCheck size={18} />
                  </span>
                  <select
                    name='teacher_id'
                    required
                    value={formData.teacher_id}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'>
                    <option value=''>Select a teacher</option>
                    {teachers.map((teacher) => (
                      <option
                        key={teacher.id}
                        value={teacher.id}>
                        {teacher.name || `Teacher ${teacher.id}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Room
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <Building size={18} />
                  </span>
                  <select
                    name='room_id'
                    required
                    value={formData.room_id}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'>
                    <option value=''>Select a room</option>
                    {rooms.map((room) => (
                      <option
                        key={room.id}
                        value={room.id}>
                        {room.name || room.room_name || `Room ${room.id}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Subject
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <BookOpen size={18} />
                  </span>
                  <select
                    name='subject_id'
                    required
                    value={formData.subject_id}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'>
                    <option value=''>Select a subject</option>
                    {subjects.map((subject) => (
                      <option
                        key={subject.id}
                        value={subject.id}>
                        {subject.name ||
                          subject.title ||
                          `Subject ${subject.id}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Schedule
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <CalendarDays size={18} />
                  </span>
                  <select
                    name='schedule_id'
                    required
                    value={formData.schedule_id}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'>
                    <option value=''>Select a schedule</option>
                    {schedules.map((schedule) => (
                      <option
                        key={schedule.id}
                        value={schedule.id}>
                        {schedule.name ||
                          schedule.title ||
                          schedule.day ||
                          `Schedule ${schedule.id}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Total Students
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <Layers size={18} />
                  </span>
                  <input
                    type='number'
                    name='total_student'
                    required
                    placeholder='Enter total number of students'
                    value={formData.total_student}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                  />
                </div>
              </div>
            </div>

            <div className='flex items-center justify-end gap-4 pt-4 border-t border-slate-100'>
              <Link
                to='/teacherclasslist'
                className='px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-all duration-200'>
                Cancel
              </Link>
              <button
                type='submit'
                disabled={loading}
                className='inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50'>
                <Save size={18} />
                <span>{loading ? 'Updating...' : 'Update Class'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TeacherClassUpdate;
