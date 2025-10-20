import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home.jsx";
import Login from "../pages/SignIn.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import SignUp from "../pages/SignUp.jsx";
import AdminPanel from "../pages/AdminPanel.jsx";
import AllUsers from "../pages/AllUsers.jsx";
import Products from "../pages/Products.jsx";
import CategoryProduct from "../pages/CategoryProduct.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Cart from "../pages/Cart.jsx";
import SearchProduct from "../pages/SearchProduct.jsx";
import About from "../components/About.jsx";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App />,
        children : [
            {
                path : "",
                element : <Home />
            },
            {
                path : "login",
                element : <Login />
            },
            {
                path : "forgot-password",
                element : <ForgotPassword />
            },
            {
                path : "sign-up",
                element : <SignUp />
            },
            {
                path : "product-category",
                element : <CategoryProduct />
            },
            {
                path : "product/:id",
                element : <ProductDetails />
            },
            {
                path : "cart-view",
                element : <Cart />
            },
            {
                path : "search-product",
                element : <SearchProduct />
            },
            {
                path : "about",
                element : <About />
            },
            {
                path : "admin-panel",
                element : <AdminPanel />,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers />
                    },
                    {
                        path : "products",
                        element : <Products />
                    }
                ]
            },
            
        ]
    }

])


export default router