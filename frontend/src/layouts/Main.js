import React from 'react';
import {Outlet} from "react-router-dom";

const Main = () => {
    return (
        <div>
            Header
            <Outlet/>
        </div>
    );
};

export default Main;