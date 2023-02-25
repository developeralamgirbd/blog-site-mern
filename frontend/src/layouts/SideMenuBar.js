import React, {useState} from 'react';
import {Menu, Layout} from "antd";
import {Link, NavLink} from "react-router-dom";
import {
    AntDesignOutlined,
    DashboardOutlined, EditOutlined, FormOutlined, OrderedListOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const items = [
    {
        key: '/dashboard',
        label:  <NavLink to='/dashboard'>Dashboard</NavLink>,
        icon: <DashboardOutlined />
    },
    {
        key: 'category',
        label:  'Category',
        icon: <AntDesignOutlined />,
        children: [
            {
                key: '/dashboard/category-create',
                label:  <NavLink to='/dashboard/category-create'>Create</NavLink>,
                icon: <FormOutlined />,
            },
            {
                key: '/dashboard/category-list',
                label:  <NavLink to='/dashboard/category-list'>List</NavLink>,
                icon: <OrderedListOutlined />,
            }
        ]
    },
    {
        key: 'post',
        label:  'Post',
        icon: <AntDesignOutlined />,
        children: [
            {
                key: '/dashboard/post-create',
                label:  <NavLink to='/dashboard/post-create'>Create</NavLink>,
                icon: <FormOutlined />,
            },
            {
                key: '/dashboard/post-list',
                label:  <NavLink to='/dashboard/post-list'>List</NavLink>,
                icon: <OrderedListOutlined />,
            }
        ]
    }
]

const SideMenuBar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu defaultSelectedKeys={window.location.pathname} items={items} mode="inline" className='mt-2'/>
        </Sider>
    );
};

export default SideMenuBar;