import axios from "axios";
import toast from "react-hot-toast";
import {setOtp, setVerifyEmail} from "../helpers/sessionHelper";

export const loginRequest = async (email, password)=>{
    try {

      const {data} =  await axios.post('/login', {email, password});
      toast.success('Login success')
      return data
    }catch (e) {
        if (e.response.status === 400){
            toast.error(e.response.data.error)
        }else {
            toast.error('Server error occurred')
        }
    }
}

export const registerRequest = async (userData)=>{
    try {

        const {data} =  await axios.post('/register', userData);
        toast.success(data.message)
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

export const verifyEmailRequest = async (email, otp)=>{
    try {

        const {data} =  await axios.get(`/users/${email}/${otp}`);
        toast.success(data.message)
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

export const sendOtpRequest = async (email)=>{
    try {

        const {data} =  await axios.get(`/users/${email}`);
        setOtp(data.otp);
        toast.success(data.message)
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

export const resetPasswordRequest = async (email, otp, password, confirmPassword)=>{
    try {

        const {data} =  await axios.patch(`/users/${email}/${otp}`, {password, confirmPassword});
        toast.success(data.message)
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