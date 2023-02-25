import axios from "axios";
import toast from "react-hot-toast";

export const postCreateUpdateRequest = async (value, id)=>{
    try {
        let url = '/posts';
        if (!id){
            await axios.post(url, value);
            toast.success('Post create success')
        }else {
            url = `/posts/${id}`;
            await axios.patch(url, value);
            toast.success('Post update success')
        }

        return true
    }catch (e) {
        if (e.response.status === 400){
            toast.error(e.response.data.error)
            return false
        }else {
            toast.error('Server error occurred')
            return false
        }
    }
}

export const getSinglePostRequest = async (id)=>{
    try {
        const {data} = await axios.get(`/posts/${id}`);
        return data

    }catch (e) {
        if (e.response.status === 400){
            toast.error(e.response.data.error)
        }else {
            toast.error('Server error occurred')
        }
    }
}

export const getPostsRequest = async ()=>{
    try {
        const {data} = await axios.get('/posts');
        return data

    }catch (e) {
        if (e.response.status === 400){
            toast.error(e.response.data.error)
        }else {
            toast.error('Server error occurred')
        }
    }
}

export const getAuthPostsRequest = async ()=>{
    try {
        const {data} = await axios.get('/posts/auth');
        return data

    }catch (e) {
        if (e.response.status === 400){
            toast.error(e.response.data.error)
        }else {
            toast.error('Server error occurred')
        }
    }
}

export const deletePostRequest = async (id)=>{
    try {
        const {data} = await axios.delete(`/posts/${id}`);

        if (data.data.deletedCount > 0){
            toast.success('Post delete success')
            return true
        }

    }catch (e) {
        if (e.response.status === 400){
            toast.error(e.response.data.error)
            return false
        }else {
            toast.error('Server error occurred')
            return false
        }
    }
}