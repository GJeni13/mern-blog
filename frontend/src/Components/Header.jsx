import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) console.log(data.message);
      else dispatch(signoutSuccess());
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?searchTerm=${searchTerm}`);
  };

  return (
    <nav className='self-center whitespace-nowrap bg-gradient-to-r from-red-300 to-orange-400 text-sm sm:text-xl font-semibold dark:text-white'>
      <div className="container mx-auto flex  items-center justify-between px-10 py-6 ">
        {/* Sidebar Toggle for Mobile */}
        <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="text-xl font-semibold flex items-center">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg text-white">
            Jenitta's
          </span>
          <span className="ml-2">Blog</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="hidden  sm:flex flex-grow max-w-md mx-8">
          <div className="relative ">
            <input 
              type="text"
              placeholder="Search..."
              className="w-full px-8 py-2 bg-gray-700 text-white border-none rounded-full focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-2 text-gray-400">
              <AiOutlineSearch size={20} />
            </button>
          </div>
        </form>

        {/* Navbar Links */}
        <div className="hidden lg:flex gap-6 font-bold font-serif">
          <Link to="/" className={`hover:text-blue-300 hover:text-2xl ${pathname === '/' && 'text-blue-400'}`}>Home</Link>
          <Link to="/about" className={`hover:text-blue-300  hover:text-2xl ${pathname === '/about' && 'text-blue-400'}`}>About</Link>
          <Link to="/projects" className={`hover:text-blue-300 hover:text-2xl ${pathname === '/projects' && 'text-blue-400'}`}>Projects</Link>
        </div>

        {/* Theme Toggle & Sign In Button */}
        <div className="flex items-center gap-4">
          <button onClick={() => dispatch(toggleTheme())} className="p-4 rounded-full bg-gray-300">
            {theme === 'light' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {currentUser ? (
            <button onClick={handleSignout} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg hover:bg-red-600">
              Sign Out
            </button>
          ) : (
            <Link to="/sign-in">
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg hover:bg-green-600">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <div className="fixed  bg-gray-900 shadow-lg p-6 flex flex-col space-y-4 lg:hidden">
          <Link to="/" className="text-white hover:text-blue-400">Home</Link>
          <Link to="/about" className="text-white hover:text-blue-400">About</Link>
          <Link to="/projects" className="text-white hover:text-blue-400">Projects</Link>
        </div>
      )}
    </nav>
  );
}
