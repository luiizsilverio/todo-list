const url = 'http://192.168.253.1:3002/api/react-native'

export const ApiService = {
    get(endpoint) {
        return fetch(`${url}/${endpoint}`)
            .then(response => response.json())
    },
    post(endpoint, data) {
        return fetch(`${url}/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify
        })
            .then(response => response.json())
    },
    put(endpoint, data) {
        return fetch(`${url}/${endpoint}?id=${data.id}`, {
            method: 'PUT',
            body: JSON.stringify
        })
            .then(response => response.json())
    },
    delete(endpoint, id) {
        return fetch(`${url}/${endpoint}?id=${id}`, {
            method: 'DELETE',            
        }) 
            .then(response => response.json())
    }
}