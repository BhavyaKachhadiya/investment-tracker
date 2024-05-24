"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession, signIn } from 'next-auth/react';

const SetGoalPage = () => {
  const { data: session } = useSession();
  const [goal, setGoal] = useState('');
  const router = useRouter();
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getgoal');
        setGoal(response.data);
      } catch (error) {
        console.error('Error fetching goal:', error);
      }
    };

    fetchGoal();
  }, []);
  const handleSetGoal = async (e) => {
    e.preventDefault();
    if (!session) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await axios.put('/api/setgoal', { goal, user_email: session.user.email, username: session.user.name });

      if (response.status === 200) {
        router.push('/'); // Redirect to home page or any other page after setting the goal
      }
    } catch (error) {
      console.error('Set goal error:', error);
    }
  };

  const handleSignInWithGoogle = async () => {
    await signIn("google");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#15191E]">
      <div className="bg-[#15191E] p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Set Your Goal</h1>
        <form onSubmit={handleSetGoal} className="space-y-4">
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-white">
              Goal
            </label>
            <input
              type="number"
              id="goal"
              name="goal"
              placeholder="Enter your goal"
              className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:border-indigo-500 sm:text-sm"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#FF1717] text-white font-medium rounded-md focus:outline-none focus:ring-2  focus:ring-offset-2"
            >
              Set Goal
            </button>
          </div>
        </form>
        {!session && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSignInWithGoogle}
              className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetGoalPage;
