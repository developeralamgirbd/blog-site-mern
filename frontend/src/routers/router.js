import {createBrowserRouter} from "react-router-dom";
import Main from "../layouts/Main";
import DashboardPage from "../pages/dashboard/Dashboard-page";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <DashboardPage/>
            }
        ]
    }
]);

export default router;