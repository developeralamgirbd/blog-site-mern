import React, {useState} from 'react';
import {Menu, Layout} from "antd";
import {NavLink} from "react-router-dom";
import {
    DashboardOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const {Item, SubMenu} = Menu;


const SideMenuBar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>

            <Menu theme="dark" defaultSelectedKeys={window.location.pathname} mode="inline" className='mt-2'>
                <Item key='/' icon={<DashboardOutlined />}>
                    <NavLink to='/'>Dashboard</NavLink>
                </Item>
                <SubMenu icon={<DashboardOutlined />} title='Post'>
                    <Item key='/' icon={<DashboardOutlined />}>
                        <NavLink to='/'>Dashboard</NavLink>
                    </Item>
                    <Item key='/create' icon={<DashboardOutlined />}>
                        <NavLink to='/post'>create</NavLink>
                    </Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
};

export default SideMenuBar;