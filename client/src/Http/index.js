import axios from "axios";


const baseUrl = "http://localhost:8800"

const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})


// api request
export const register = (data) => api.post("/api/auth/register",data)
export const login = (data) => api.post("/api/auth/login",data)
export const postServer = (data) => api.post("/api/post/add",data)
export const uploadfile = (data) => api.post("/api/post/image",data)
export const timelinePost = (id) => api.get(`/api/post/${id}/timeline`)
export const likedPost = (id,userId) => api.put(`/api/post/${id}/like`,{userId})
export const getOneProfile = (id) => api.get(`/api/auth/${id}`)
export const updateUserProfile = (id,data) => api.put(`/api/auth/${id}`,data)
export const fetchAllUser = () => api.get(`/api/people`)
export const multiFollow = (id,followingUserId) => api.put(`/api/auth/follower/${id}`,{followingUserId})
export const getChatsData = (id) => api.get(`/api/chat/${id}`)
export const getChatMessage = (id) => api.get(`/api/message/${id}`)
export const createMessage = (message) => api.post(`/api/message`,message)




export default api;
