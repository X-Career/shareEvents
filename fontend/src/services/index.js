import axios from 'axios';
import { url } from "./api";
import { jwtDecode } from "jwt-decode"


const axiosInstance = axios.create({
    baseURL: url,
})

axiosInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("persist:root")).accessToken;
    // console.log(token);
    const bearerToken = `Bearer ${JSON.parse(token)}`;
    // console.log('beareToken: ' + beareToken);

    if(token){
        config.headers.Authorization = bearerToken;
    }
    return config
})

export const getAllUser = async (pageSize, pageIndex) => {
    return await axios.get(`${url}/user/getAllUsers?pageSize=${pageSize}&pageIndex=${pageIndex}`)
};

export const deleteUser = async (id) => {
    return await axios.delete(`${url}/user/deleteUser/${id}`);
};

export const getUserById = async (id, user) => {
    return await axios.get(`${url}/user/loadUser/${id}`, user);
};

export const editUser = async (id, user) => {
    return await axiosInstance.put(`${url}/user/updateUser/${id}`, user);
};

export const getAllEvents = async (pageSize, pageIndex) => {
    return await axios.get(`${url}/event?pageSize=${pageSize}&pageIndex=${pageIndex}`)
};

export const deleteEvent = async (id) => {
    return await axios.delete(`${url}/event/deleteEvent/${id}`);
};
export const getAllseat = async (pageSize, pageIndex) => {
    return await axios.get(`${url}/seat/getAllSeats?pageSize=${pageSize}&pageIndex=${pageIndex}`)
};

export const deleteSeat = async (id) => {
    return await axiosInstance.delete(`${url}/seat/deleteSeat/${id}`);
};

