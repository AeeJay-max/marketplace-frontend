import React, { useContext, useState, useEffect } from 'react';
import Logo from './Logo.jsx';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser, FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import apiinput from '../common/index.js';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice.js';
import ROLE from '../common/role.js';
import Context from '../context/index.js';

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context);
  const { setCartProductCount } = context;

  const [menu, setMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchValue.trim()) {
        navigate(`/search-product?q=${encodeURIComponent(searchValue.trim())}`);
      } else {
        navigate(`/`);
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [searchValue, navigate]);

  const handleLogout = async () => {
    try {
      const res = await fetch(apiinput.logout.url, {
        method: apiinput.logout.method,
        credentials: 'include',
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/")
        setCartProductCount(0);
        setMenu(false);
      } else if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong during logout');
    }
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleAbout = () => {
    navigate("/about")
  }

  return (
    <header className="h-16 shadow-lg bg-sky-100 fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">

        {/* LOGO */}
        <div className="flex items-center justify-center w-[200px] sm:w-[240px] md:w-[280px] h-auto overflow-hidden">
          <Link
            to="/"
            className="block transition-transform duration-200 hover:scale-[1.03] hover:shadow-md shadow-gray-300 rounded-md text-lg"
          >
            <Logo w={170} h={50} />
          </Link>
        </div>



        {/* SEARCH BAR */}
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border border-sky-600 rounded-full 
                        focus-within:shadow-[0_0_8px_rgba(0,0,0,0.2)] focus-within:scale-105 pl-2 bg-slate-50">
          <input
            type="text"
            placeholder="Search products here..."
            className="w-full outline-none bg-slate-50 px-2"
            value={searchValue}
            onChange={handleInputChange}
          />
          <div className="text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        {/* USER + CART + LOGIN/LOGOUT */}
        <div className="flex items-center gap-7">

          {/* USER AVATAR MENU */}
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl text-blue-600 cursor-pointer hover:scale-105"
                onClick={() => setMenu(prev => !prev)}
              >
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    className="w-10 h-10 rounded-full object-cover border border-blue-300"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menu && (
              <div className="absolute bg-slate-50 top-11 right-0 h-fit p-1 shadow-md shadow-gray-400 rounded-md w-36">
                <nav className="flex flex-col gap-1">
                  {user?.role === ROLE.Admin && (
                    <Link
                      to="/admin-panel/products"
                      className="block px-3 py-1 hover:bg-slate-200 rounded-md"
                      onClick={() => setMenu(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-1 hover:bg-slate-200 rounded-md text-red-500"
                  >
                    Logout
                  </button>
                  <button
                    onClick={handleAbout}
                    className="block w-full text-left px-3 py-1 hover:bg-slate-200 rounded-md text-blue-500"
                  >
                    About
                  </button>
                </nav>
              </div>
            )}
          </div>

          {/* CART ICON */}
          {user?._id && (
            <Link
              to="/cart-view"
              className="text-2xl relative cursor-pointer hover:scale-105"
            >
              <FaCartShopping />
              <div className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          {/* LOGIN / LOGOUT BUTTON */}
          {!user?._id && (
            <Link to="/login">
              <button className="bg-blue-600 px-3 py-1 rounded-full text-white hover:bg-blue-700 hover:shadow-lg hover:scale-105">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
