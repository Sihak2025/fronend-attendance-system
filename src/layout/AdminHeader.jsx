/** @format */

import React from 'react';
import { Bell, Search, UserCircle2 } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className='sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 backdrop-blur-md'>
      <div className='flex items-center gap-3 w-96'>
        <div className='relative w-full'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400'>
            <Search size={18} />
          </span>
          <input
            type='text'
            placeholder='Search anything here...'
            className='w-full rounded-xl bg-slate-800/60 border border-slate-700/60 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-400 transition focus:border-blue-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <button
          type='button'
          className='relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300 transition hover:bg-slate-800 hover:text-white'>
          <Bell size={18} />
          <span className='absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-slate-900'></span>
        </button>
        <div className='h-6 w-[1px] bg-slate-800'></div>
        <div className='flex items-center gap-3 pl-1'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold'>
            <UserCircle2 size={24} />
          </div>
          <div className='text-left'>
            <p className='text-sm font-semibold text-slate-200 leading-tight'>
              Admin
            </p>
            <p className='text-xs text-slate-400'>Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
