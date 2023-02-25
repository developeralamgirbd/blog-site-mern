import React from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";
import {Badge} from "antd";
import useCategories from "../hooks/useCategories";
import Search from "../components/Search";

const Main = () => {

    const [categories, setCategories] = useCategories();

    return (
        <>
           <header>
               <nav className="navbar navbar-expand-lg bg-light">
                   <div className="container">
                       <Link className="navbar-brand" to="/">WRITE YOUR BLOG</Link>
                       <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                               data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                               aria-expanded="false" aria-label="Toggle navigation">
                           <span className="navbar-toggler-icon"></span>
                       </button>
                       <div className="collapse navbar-collapse" id="navbarSupportedContent">

                           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                               <li className="nav-item">
                                   <Link className="nav-link active" aria-current="page" to="/blog">Blog</Link>
                               </li>
                               <li className="nav-item">
                                   <Link className="nav-link active" aria-current="page" to="/category">Categories</Link>
                               </li>
                           </ul>

                           <ul className="navbar-nav">
                               <li className="nav-item">
                                   <NavLink className="nav-link" aria-current="page" to="/login">Login</NavLink>
                               </li>

                               <li className="nav-item">
                                   <NavLink className="nav-link" aria-current="page" to="/register">Register</NavLink>
                               </li>

                           </ul>
                           <Search/>

                       </div>
                   </div>
               </nav>
           </header>

            <section>
                <div className="container">
                    <div className="categories my-3">
                        <ul className="">
                            {
                                categories.map(category => (
                                    <li className="" >
                                        <Link to= {`/category/posts/${category.name}`}>
                                            {category.name}
                                            {/*<Badge count={0} offset={[4]} showZero/>*/}
                                        </Link>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                </div>


            </section>
            <div className="container">
                <Outlet/>
            </div>
        </>
    );
};

export default Main;