/** @format */

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../service/api';
import {
  LayoutDashboard,
  ClipboardCheck,
  BookOpen,
  LogOut,
} from 'lucide-react';

const TeacherSidebar = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({
    name: 'Teacher',
    role: 'Teacher Account',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setTeacher({
          name: parsedUser.name,
          role: parsedUser.role
            ? `${parsedUser.role.charAt(0).toUpperCase() + parsedUser.role.slice(1)} Account`
            : 'Teacher Account',
        });
      } catch (err) {
        console.error('Failed to parse user from localStorage', err);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/teacherSidebar/dashboardTeacher',
      icon: LayoutDashboard,
    },
    {
      name: 'My Classes',
      path: '/viewclass',
      icon: BookOpen,
    },
  ];

  return (
    <aside className='fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 text-white'>
      <div className='flex h-20 items-center border-b border-slate-700 px-6'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600'>
            <ClipboardCheck size={23} />
          </div>
          <div>
            <h1 className='text-lg font-bold'>Attendance</h1>
            <p className='text-xs text-slate-400'>Management System</p>
          </div>
        </div>
      </div>

      <div className='border-b border-slate-700 px-5 py-5'>
        <div className='flex items-center gap-3'>
          <div className='flex h-11 w-11 min-w-[2.75rem] items-center justify-center rounded-full bg-blue-600 font-bold uppercase'>
            {teacher.name.charAt(0)}
          </div>
          <div className='overflow-hidden'>
            <p className='font-semibold truncate'>{teacher.name}</p>
            <p className='text-xs text-slate-400 truncate capitalize'>
              {teacher.role}
            </p>
          </div>
        </div>
      </div>

      <nav className='px-4 py-5'>
        <p className='mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500'>
          Teacher Menu
        </p>
        <div className='space-y-1'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }>
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
      <div className='absolute bottom-0 left-0 w-full border-t border-slate-700 p-4'>
        <button
          onClick={handleLogout}
          className='flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400'>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default TeacherSidebar;
