import axios from "axios";
import { deployedUrl } from "../endpoints";


export async function registerUser(payload:any) {
    try {
        const register = await axios.post(`${deployedUrl}/api/v1/Users/RegisterStudent`, payload);
        return register;

    } catch(error: any) {
        alert(error);
    }

}

export async function verifyUserAccount(payload:any) {
    try {
        const verify = await axios.post(`${deployedUrl}/api/v1/Users/VerifyOTP`, payload);
        return verify;

    } catch(error: any) {
        alert(error);
    }

}

export async function LoginUser(payload:any) {
    try {
        const register = await axios.post(`${deployedUrl}/api/v1/Users/Login`, payload);
        return register;

    } catch(error: any) {
        alert(error);
    }

}

export async function sendOtp(payload:any) {
    try {
        const sendOtp = await axios.post(`${deployedUrl}/api/v1/Users/SendResetPasswordOtp`, payload);
        return sendOtp;
    } catch(error: any) {
        alert(error);
    }
}

export async function verifyOtp(payload:any) {
    try {
        const verifyOtp = await axios.put(`${deployedUrl}/api/v1/Users/ResetPassword`, payload);
        return verifyOtp;
    } catch(error: any) {
        alert(error);
    }
}