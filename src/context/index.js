import React, { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice.js";
import apiinput from "../common/index.js";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  // ✅ Fetch logged-in user details and update Redux
  const fetchDetails = async () => {
    try {
      const res = await fetch(apiinput.userDetails.url, {
        method: apiinput.userDetails.method,
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        dispatch(setUserDetails(data.data)); // Update Redux
      } else {
        dispatch(setUserDetails(null));
      }
    } catch (error) {
      console.error("fetchDetails error:", error);
      dispatch(setUserDetails(null));
    }
  };

  // ✅ Fetch user's cart count
  const fetchUserAddToCart = async () => {
    try {
      const res = await fetch(apiinput.countcart.url, {
        method: apiinput.countcart.method,
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        setCartProductCount(data.data);
      } else {
        setCartProductCount(0);
      }
    } catch (error) {
      console.error("fetchUserAddToCart error:", error);
      setCartProductCount(0);
    }
  };

  return (
    <Context.Provider
      value={{
        fetchDetails,
        fetchUserAddToCart,
        cartProductCount,
        setCartProductCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
