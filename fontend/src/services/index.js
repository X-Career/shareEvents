import axios from 'axios'
import { getValueFromLocalStorage } from '../utils'
import { jwtDecode } from "jwt-decode"
import { useSelector } from 'react-redux'

const instance = axios.create({
    baseURL: "http://localhost:3001"
})

export const getAllUser = (pageSize, pageIndex) => {
    return instance.get(`/user/getAllUsers?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}
export const deleteUser = async (id) => {
    return await instance.delete(`/user/deleteUser/${id}`);
};
export const getAllEvents = (pageSize, pageIndex) => {
    return instance.get('/event', {
        params: {
            pageSize,
            pageIndex,
        },
    });
};

export const deleteEvents = async (id) => {
    return await instance.delete(`/event/deleteEvent/${id}`);
};