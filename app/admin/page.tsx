"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Function to check if admin is authenticated
    const isAuthenticated = () => {
      // Example: Check if there is a token in local storage
      const token = localStorage.getItem('token');
      return !!token; // Returns true if token exists, false otherwise
    };

    // If admin is not authenticated, redirect to login page
    if (!isAuthenticated()) {
      router.push('/login'); // Redirect to your admin login page
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Admin Page</h1>
      {/* Your admin page content goes here */}
    </div>
  );
};

export default Page;
