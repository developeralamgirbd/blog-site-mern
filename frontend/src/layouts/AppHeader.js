import React, {useState} from 'react';
import {Avatar, Dropdown, Space, theme, Layout, Row, Col, Button} from "antd";
import {DownOutlined, KeyOutlined, SmileOutlined, UploadOutlined, UserOutlined} from "@ant-design/icons";
import {sessionRemove} from "../helpers/sessionHelper";

const {Header} = Layout;

const logout = ()=>{
    sessionRemove();
}

const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Profile
            </a>
        ),
        icon: <UserOutlined />
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
               Change Password
            </a>
        ),
        icon: <KeyOutlined rotate={-130} />
    },
    {
        key: '3',
        label: (
            <a href='#' onClick={logout} >
               Log Out
            </a>
        ),
        icon: <UploadOutlined rotate={90} />
    }
];

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];

const AppHeader = () => {
    const [user, setUser] = useState(UserList[0]);
    const [color, setColor] = useState(ColorList[0]);
    const [gap, setGap] = useState(GapList[0]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                <Row>
                    <Col span={2} offset={22}>
                        <Avatar
                            style={{
                                backgroundColor: color,
                                verticalAlign: 'middle',
                                marginRight: '10px'
                            }}
                            size="large"
                            gap={gap}
                        >
                            {user}
                        </Avatar>
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    Hover me
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </Col>
                </Row>


            </Header>
        </>
    );
};

export default AppHeader;