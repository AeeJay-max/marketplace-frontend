// App.js
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import apiinput from './common/index.js';
import Context from './context/index.js';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice.js';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);


  const fetchDetails = async () => {
    try {
      const res = await fetch(apiinput.details1.url, {
        method: apiinput.details1.method,
        credentials: 'include',
      });
      const dataapi = await res.json();
      if (dataapi.success && dataapi.data) {
        dispatch(setUserDetails(dataapi.data));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };


  const fetchUserAddToCart = async () => {
    try {
      const res = await fetch(apiinput.countCart.url, {
        method: apiinput.countCart.method,
        credentials: 'include',
      });
      const dataapi = await res.json();
      console.log('Cart data:', dataapi);

      const count = dataapi?.data?.count ?? 0;
      setCartProductCount(count);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartProductCount(0);
    }
  };


  useEffect(() => {
    fetchDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <Context.Provider
      value={{
        fetchDetails,
        fetchUserAddToCart,
        cartProductCount,
        setCartProductCount,
      }}
    >
      <ToastContainer position="top-center" />

      <Header />
      <main className="min-h-[calc(100vh-130px)] pt-16">
        <Outlet />
      </main>
      <Footer className="bottom-0" />
    </Context.Provider>
  );
}

export default App;
