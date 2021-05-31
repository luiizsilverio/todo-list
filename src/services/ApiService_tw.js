const url = 'http://192.168.253.1:3002/api/react-native'
//const url = 'http://localhost:3333'

export const ApiService = {
    get(endpoint) {
        return fetch(`${url}/${endpoint}`)
            .then(response => response.json())
    },
    post(endpoint, data) {
        console.log(`${url}/${endpoint}`)
        console.log('POST', JSON.stringify(data))
        return fetch(`${url}/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => response.json())                
    },
    put(endpoint, data) {
        return fetch(`${url}/${endpoint}?id=${data.id}`, {        
            method: 'PUT',
            body: JSON.stringify(data)
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