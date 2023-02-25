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

export const getPostsRequest = async (page)=>{
    try {
        const {data} = await axios.get(`/posts/show/${page}`);
        return data

    }catch (e) {
        if (e.response.status === 400){
            toast.error(e.response.data.error)
        }else {
            toast.error('Server error occurred')
        }
    }
}

export const getPostsByCategoryRequest = async (name, page)=>{
    try {
        const {data} = await axios.get(`/posts/category/${name}/${page}`);
        return data

    }catch (e) {
        if (e.response.status === 400){
            // toast.error(e.response.data.error)
        }else {
            toast.error('Server error occurred')
        }
    }
}
export const getPostsByKeywordRequest = async (keyword, page)=>{
    try {
        const {data} = await axios.get(`/posts/search/${keyword}/${page}`);
        return data
    }catch (e) {

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