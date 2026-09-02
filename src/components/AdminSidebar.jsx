/** @format */

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../service/api';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  Building2,
  DoorOpen,
  CalendarDays,
  ClipboardCheck,
  Shield,
  LogOut,
  GraduationCap,
  Menu,
  X,
} from 'lucide-react';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('API Logout failed, forcing local cleanup:', error);
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboardAdmin', icon: LayoutDashboard },
    { name: 'Manage Users', path: '/userlist', icon: Shield },
    {
      name: 'Manage Teacher Class',
      path: '/teacherclasslist',
      icon: GraduationCap,
    },
    { name: 'Students', path: '/studentlist', icon: Users },
    { name: 'Teachers', path: '/teacherlist', icon: UserCheck },
    { name: 'Subjects', path: '/subjectlist', icon: BookOpen },
    { name: 'Buildings', path: '/buildinglist', icon: Building2 },
    { name: 'Classrooms', path: '/roomlist', icon: DoorOpen },
    { name: 'Schedules', path: '/schedulelist', icon: CalendarDays },
    { name: 'Attendances', path: '/attendancelist', icon: ClipboardCheck },
    {
      name: 'Attendance Reports',
      path: '/attendancereport',
      icon: ClipboardCheck,
    },
  ];

  return (
    <>
      <div className='lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 z-50 flex items-center justify-between px-4 text-white shadow-md'>
        <div className='flex items-center gap-3'>
          <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md'>
            <ClipboardCheck size={20} />
          </div>
          <div>
            <h1 className='text-xs font-bold leading-tight'>Attendance</h1>
            <p className='text-[10px] text-slate-400'>Management System</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white focus:outline-none'>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className='fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity'
        />
      )}
      <aside
        className={`fixed top-0 bottom-0 z-50 w-64 bg-slate-900 text-white border-r border-slate-800 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'left-0' : '-left-64 lg:left-0'
        }`}>
        <div className='absolute top-0 left-0 right-0 h-20 hidden lg:flex items-center border-b border-slate-800 px-5 bg-slate-900 z-10'>
          <div className='flex items-center gap-3.5'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md'>
              <ClipboardCheck size={22} />
            </div>
            <div>
              <h1 className='text-sm font-bold leading-tight'>Attendance</h1>
              <p className='text-xs text-slate-400'>Management System</p>
            </div>
          </div>
        </div>

        <div className='absolute top-20 lg:top-24 bottom-20 left-0 right-0 overflow-y-auto px-3.5 py-4 lg:py-1 space-y-1.5'>
          <p className='mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500'>
            Main Menu
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`
                }>
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      className={isActive ? 'text-white' : 'text-slate-400'}
                    />
                    <span className='truncate'>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        <div className='absolute bottom-0 left-0 right-0 h-20 px-4 py-3.5 border-t border-slate-800 bg-slate-900 flex items-center'>
          <button
            onClick={handleLogout}
            className='flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-rose-500/15 hover:text-rose-400'>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;