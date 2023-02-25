import React from 'react';
import {Col, Row} from "antd";
import PostCreateForm from "../../components/post/PostCreateForm";

const PostCreatePage = () => {
    return (
        <Row>
            <Col span={8} offset={8}>
                <PostCreateForm/>
            </Col>

        </Row>
    );
};

export default PostCreatePage;