import axios from 'axios'


const api = axios.create({
    baseURL: "http://localhost:8080/api/",
    headers: {
        "Content-type": "application/json",
    }
});

api.interceptors.request.use(async (config) => {
    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString)
    if (token) {
        config.headers.Authorization = `Bearer ${token.jwt}`
    }
    return config
})

export const getAllUsers = async () => {
    let response = await api.get("users")
    return response.data;

}

export const removeUser = async (id) => {
    let response = await api.delete(`users/${id}`)
    return response.data;
}

export const addUser = async (data) => {
    let response = await api.post("users", data)
    return response.data;
}

export const updateUser = async (data) => {
    let response = await api.put(`users/${data.id}`, data)
    return response.data
}

export const getUserByID = async (id) => {
    let response = await api.get(`users/userID/${id}`)
    return response.data
}

export const getAllRoles = async () => {
    let response = await api.get(`roles`)
    return response.data
}

export const activateAccount = async (id) => {
    let response = await api.patch(`users/activation/${id}`)
    return response.data
}

export const deactivationAccount = async (id) => {
    let response = await api.patch(`users/deactivation/${id}`)
    return response.data
}