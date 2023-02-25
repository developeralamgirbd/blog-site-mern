import React from 'react';
import {Link} from "react-router-dom";

const PostCard = ({post}) => {
    return (
        <>
            <div>
                <h1>
                    <Link to={`/post/${post._id}`}>
                        {post.title}
                    </Link>

                </h1>
                <p>{post.description}</p>
            </div>
        </>
    );
};

export default PostCard;