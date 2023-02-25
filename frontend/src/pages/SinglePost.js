import React, {useEffect, useState} from 'react';
import {getSinglePostRequest} from "../APIRequest/postApi";
import {useParams} from "react-router-dom";

const SinglePost = () => {

    const [post, setPost] = useState({});
    const params = useParams();

    useEffect(()=>{
        getSinglePostRequest(params.id).then(res => {
            document.title = res.data.title
            setPost(res?.data)
        })
    }, [])

    return (
        <div>
            <h1>{post.title}</h1>
            <h1>{post.description}</h1>
            <h1>{post.authorName}</h1>
            <h1>{post.categoryName}</h1>
        </div>
    );
};

export default SinglePost;