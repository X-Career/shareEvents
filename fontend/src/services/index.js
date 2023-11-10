import axios from 'axios'
import { getValueFromLocalStorage } from '../utils'
// import jwtDecode from "jwt-decode"

const instance = axios.create({
    baseURL: "http://localhost:3001"
})

export const getAllUser = (pageSize, pageIndex) => {
    return instance.get(`/user/getAllUsers?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}