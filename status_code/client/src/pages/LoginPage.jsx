import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authAPI';
import { useDispatch } from 'react-redux';
import { setToken } from '../features/auth/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await loginUser({email, password})
    if(data.success){
      dispatch(setToken(data.data.token));
      navigate('/search')
    }else{
      
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-800">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">
           Don't have an account?
          </span>
          <Link to={'/signup'} >Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
