import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== 'admin') return redirect('/');
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Only admin users can access this page.</p>
      <p>{session.user.email}</p>
      <p>{session.user.role}</p>
    </div>
  );
};

export default page;
