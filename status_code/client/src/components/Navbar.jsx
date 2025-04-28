import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between w-full">
      <div>
        <Link to="/search" className="mr-4">Search</Link>
        <Link to="/lists" className="mr-4">Lists</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
    </nav>
  );
}
