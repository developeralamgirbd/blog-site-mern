import {createBrowserRouter} from "react-router-dom";
import AdminMain from "../layouts/AdminMain";
import DashboardPage from "../pages/dashboard/Dashboard-page";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import Main from "../layouts/Main";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import NewPasswordPage from "../pages/auth/NewPasswordPage";
import PrivateRoute from "./privateRoute";

const router = createBrowserRouter([
    {
        path: '/dashboard',
        element: <PrivateRoute><AdminMain/></PrivateRoute> ,
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage/>
            },
        ]
    },
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: '/register',
                element: <RegisterPage/>
            },
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/send-otp',
                element: <ForgotPasswordPage/>
            },
            {
                path: '/verify-otp',
                element: <VerifyOtpPage/>
            },
            {
                path: '/reset-password',
                element: <NewPasswordPage/>
            }
        ]
    },

]);

export default router;