import React, {useEffect, useState} from 'react';
import PostCard from "../components/PostCard";
import {Button, Col, Row} from "antd";
import {getPostsRequest} from "../APIRequest/postApi";

const HomePage = () => {

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [posts, setPosts] = useState([])

    const loadPosts = async ()=> {
        try {
            getPostsRequest(page).then(res => {
                setPosts(res?.data?.posts);
                setTotal(res?.data?.totalPost[0]?.count)
            })

        }catch (e) {
            console.log(e)
        }
    }

    const loadMore = async ()=>{
        try {
            setLoading(true);
            getPostsRequest(page).then(res => {
                setPosts([...posts, ...res?.data?.posts])
            })
            setLoading(false);
        }catch (e) {
            console.log(e);
        }

    }

    useEffect(()=> {
        if (page === 1) return;
        loadMore().catch(e => console.log(e));

    }, [page])

    useEffect(()=> {
        document.title = 'Home'
        loadPosts().catch(e => console.log(e));
    }, [])


    return (
        <>
            <Row gutter={16}>

                {
                   posts.map(post => (
                       <Col span={8}>
                            <PostCard post={post}/>
                        </Col>
                    ))
                }
            </Row>
            {posts && posts.length < total && (

            <div className='d-flex justify-content-center my-5 mb-5'>
                <Button type="primary" className='mb-5'
                        loading={loading}
                        disabled={loading}
                        onClick={event => {
                            event.preventDefault();
                            setPage(page + 1);
                        }}
                >
                    Load More
                </Button>
            </div>
            )}

        </>
    );
};

export default HomePage;