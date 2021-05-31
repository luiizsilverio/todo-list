import { api } from './api'

export const ApiService = {
    get(endpoint) {
        return api.get(`/${endpoint}`)
            .then(response => response.data)
            .catch(error => console.error(error))
    },
    post(endpoint, data) {
        return api.post(`/${endpoint}`, data)
            .then(response => response.data)                
    },
    put(endpoint, data) {
        return api.put(`/${endpoint}/${data.id}`, data)
            .then(response => response.data)
    },
    delete(endpoint, id) {
        return api.delete(`/${endpoint}/${id}`)
            .then(response => response.data)
    }
}