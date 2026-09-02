/** @format */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../service/authService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setIsSubmitting(true);
      const data = await authService.login(formData);

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // បន្ថែមការរក្សាទុក Object user ទាំងមូលនៅទីនេះ ដើម្បីឱ្យ Sidebar ទាញយកឈ្មោះឃើញ
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      const userRole = data.user?.role || data.role;
      if (userRole) {
        localStorage.setItem('role', userRole);
      }

      if (userRole === 'admin') {
        navigate('/dashboardAdmin');
      } else if (userRole === 'teacher') {
        navigate('/teacherSidebar/dashboardTeacher');
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message ||
          'Invalid email or password. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center p-6'>
      <div className='max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
            Welcome Back
          </h1>
          <p className='text-sm text-slate-500 mt-1'>
            Please enter your details to sign in.
          </p>
        </div>

        {error && (
          <div className='mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-sm text-rose-600'>
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className='space-y-5'>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>
              Email Address
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='e.g. name@example.com'
              required
              className='w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50 transition-all duration-200'
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='••••••••'
              required
              className='w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50 transition-all duration-200'
            />
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-medium text-white shadow-sm transition-all duration-200 
              ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className='mt-6 text-center text-sm text-slate-500'>
          Don't have an account?{' '}
          <Link
            to='/register'
            className='font-semibold text-blue-600 hover:text-blue-700'>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
