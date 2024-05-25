// pages/index.js
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Redirect = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  // Render a loading state or null while checking session status
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>If you are authenticated, you will be redirected to the dashboard.</p>
    </div>
  );
};

export default Redirect;
