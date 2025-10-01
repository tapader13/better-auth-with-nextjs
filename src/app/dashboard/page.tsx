import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/');
  // Mock user data - in real app, this would come from your auth context/state
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Premium Member',
    joinDate: 'January 15, 2024',
    avatar: 'JD',
  };

  const stats = [
    { label: 'Total Logins', value: '47', change: '+12%' },
    { label: 'Active Sessions', value: '1', change: 'Current' },
    { label: 'Security Score', value: '95%', change: 'Excellent' },
    { label: 'Days Active', value: '28', change: 'Streak' },
  ];

  const recentActivities = [
    { action: 'Password changed', time: '2 hours ago', status: 'Completed' },
    { action: 'New device login', time: '1 day ago', status: 'Verified' },
    { action: 'Profile updated', time: '3 days ago', status: 'Completed' },
    { action: 'Two-factor enabled', time: '1 week ago', status: 'Active' },
  ];

  const securityTips = [
    'Enable two-factor authentication for extra security',
    'Use a unique, strong password for your account',
    'Regularly review your login activity',
    'Log out from devices you no longer use',
    'Keep your recovery email up to date',
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Welcome back, {session?.user?.name}!
          </h1>
          <p className='text-gray-600'>
            This is your secure dashboard where you can manage your account,
            view activities, and practice authentication security best
            practices.
          </p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow'
            >
              <p className='text-sm font-medium text-gray-600 mb-2'>
                {stat.label}
              </p>
              <div className='flex items-baseline justify-between'>
                <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
                <span className='text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full'>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* User Profile Card */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Profile Card */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center space-x-4 mb-6'>
                <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                  <span className='text-white font-bold text-lg'>
                    {user.avatar}
                  </span>
                </div>
                <div>
                  <h2 className='text-xl font-bold text-gray-900'>
                    {user.name}
                  </h2>
                  <p className='text-gray-600'>{user.email}</p>
                  <span className='inline-block mt-1 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full'>
                    {user.role}
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <p className='text-gray-500'>Member since</p>
                  <p className='font-medium text-gray-900'>{user.joinDate}</p>
                </div>
                <div>
                  <p className='text-gray-500'>Account status</p>
                  <p className='font-medium text-green-600'>Verified ✓</p>
                </div>
              </div>

              <div className='mt-6 flex space-x-3'>
                <button className='flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors'>
                  Edit Profile
                </button>
                <button className='flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors'>
                  Security Settings
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-bold text-gray-900 mb-4'>
                Recent Activity
              </h3>
              <div className='space-y-4'>
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between py-3 border-b border-gray-100 last:border-0'
                  >
                    <div>
                      <p className='font-medium text-gray-900'>
                        {activity.action}
                      </p>
                      <p className='text-sm text-gray-500'>{activity.time}</p>
                    </div>
                    <span className='bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full'>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security Sidebar */}
          <div className='space-y-8'>
            {/* Security Tips */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center'>
                <svg
                  className='w-5 h-5 text-blue-500 mr-2'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                    clipRule='evenodd'
                  />
                </svg>
                Security Tips
              </h3>
              <ul className='space-y-3'>
                {securityTips.map((tip, index) => (
                  <li key={index} className='flex items-start'>
                    <svg
                      className='w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='text-sm text-gray-700'>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className='bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-sm p-6 text-white'>
              <h3 className='text-lg font-bold mb-4'>Quick Actions</h3>
              <div className='space-y-3'>
                <button className='w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors'>
                  Change Password
                </button>
                <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors border border-white'>
                  Enable 2FA
                </button>
                <button className='w-full bg-transparent text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white'>
                  View All Sessions
                </button>
              </div>
            </div>

            {/* Practice Area */}
            <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-6'>
              <h3 className='text-lg font-bold text-yellow-800 mb-2'>
                Auth Practice Area
              </h3>
              <p className='text-yellow-700 text-sm mb-4'>
                This dashboard demonstrates real-world authentication patterns.
                Practice implementing:
              </p>
              <ul className='text-yellow-700 text-sm space-y-2'>
                <li>• Protected route handling</li>
                <li>• User session management</li>
                <li>• Security best practices</li>
                <li>• Role-based access control</li>
                <li>• Activity logging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
