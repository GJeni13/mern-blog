import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../Components/OAuth';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);  
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields.'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success===false) {
       dispatch(signInFailure(data.message));
      }
          if(res.ok){
        dispatch(signInSuccess(data));
            navigate('/');
    }
   } catch (error) {
    dispatch(signInFailure(error.message));
       }
  };

  return (
    <div className="min-h-screen mt-2">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left Section */}
        <div className="flex-1 mt-14">
          <Link to="/" className="mt-6 font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Jenitta
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign in with your email and password or with Google.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <form className="mt-16 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Your Email
              </label>
              <input
                className="rounded-lg"
                type="email"
                placeholder="example@gmail.com"
                id="email"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Your Password
              </label>
              <input
                className="rounded-lg"
                type="password"
                placeholder="Enter Your Password"
                id="password"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-10 py-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold text-lg transition-transform duration-300 transform hover:scale-105 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 shadow-lg"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && <div className="text-red-500 mt-5">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
}
