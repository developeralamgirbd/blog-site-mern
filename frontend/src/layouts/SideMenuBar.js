import React, {useState} from 'react';
import {Menu, Layout} from "antd";
import {Link, NavLink} from "react-router-dom";
import {
    DashboardOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const {Item, SubMenu} = Menu;

const items = [
    {
        key: '/dashboard',
        label:  <Link to='/dashboard'>Dashboard</Link>,
        icon: <DashboardOutlined />
    },
    {
        key: '/post',
        label:  'Post',
        icon: <DashboardOutlined />,
        children: [
            {
                key: '/dashboard/post',
                label:  <Link to='/dashboard/create-post'>Dashboard</Link>,
                icon: <DashboardOutlined />,
            }
        ]
    }
]

const SideMenuBar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>

            <Menu theme="dark" defaultSelectedKeys={window.location.pathname} items={items} mode="inline" className='mt-2'>
                {/*<Item key='/dashboard' icon={<DashboardOutlined />}>*/}
                {/*    <NavLink to='/dashboard'>Dashboard</NavLink>*/}
                {/*</Item>*/}
                {/*<SubMenu icon={<DashboardOutlined />} key='/post' title='Post'>*/}
                {/*    /!*<Item key='/' icon={<DashboardOutlined />}>*!/*/}
                {/*    /!*    <NavLink to='/'>Dashboard</NavLink>*!/*/}
                {/*    /!*</Item>*!/*/}
                {/*    /!*<Item key='/create' icon={<DashboardOutlined />}>*!/*/}
                {/*    /!*    <NavLink to='/post'>create</NavLink>*!/*/}
                {/*    /!*</Item>*!/*/}
                {/*</SubMenu>*/}
            </Menu>
        </Sider>
    );
};

export default SideMenuBar;