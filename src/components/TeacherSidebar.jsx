/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../service/api';
import {
  LayoutDashboard,
  ClipboardCheck,
  BookOpen,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const TeacherSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
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
          name: parsedUser.name || 'Teacher',
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
    <>
      <div className='lg:hidden fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-4 text-white'>
        <div className='flex items-center gap-3'>
          <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white'>
            <ClipboardCheck size={20} />
          </div>
          <div>
            <h1 className='text-base font-bold tracking-tight'>Attendance</h1>
            <p className='text-[10px] text-slate-400'>Management System</p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className='rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-300 hover:text-white transition'>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className='lg:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm transition-opacity'
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
        <div className='flex h-20 items-center border-b border-slate-800 px-6'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20'>
              <ClipboardCheck size={22} />
            </div>
            <div>
              <h1 className='text-lg font-bold tracking-tight text-white'>
                Attendance
              </h1>
              <p className='text-xs text-slate-400'>Management System</p>
            </div>
          </div>
        </div>
        <div className='border-b border-slate-800 px-5 py-5 bg-slate-900/50'>
          <div className='flex items-center gap-3'>
            <div className='flex h-11 w-11 min-w-[2.75rem] items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 font-extrabold uppercase text-sm'>
              {teacher.name.charAt(0)}
            </div>
            <div className='overflow-hidden'>
              <p className='font-bold truncate text-slate-100 text-sm'>
                {teacher.name}
              </p>
              <p className='text-xs text-slate-400 truncate capitalize mt-0.5'>
                {teacher.role}
              </p>
            </div>
          </div>
        </div>
        <nav className='px-4 py-5 flex-1 overflow-y-auto space-y-6'>
          <div>
            <p className='mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 select-none'>
              Teacher Menu
            </p>
            <div className='space-y-1.5'>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`}>
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
        <div className='border-t border-slate-800 p-4 bg-slate-900/40'>
          <button
            onClick={handleLogout}
            className='flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-400'>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default TeacherSidebar;
