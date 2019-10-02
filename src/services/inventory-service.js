import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export const getAllInventory = () => {
    return axios.get(`${apiUrl}/inventory`)
}

export const createInventory = (inventory) => {
    axios.post(`${apiUrl}/inventory/add`, { inventory })
        .then(_ => {
            console.log('add inventory successsfully')
        })
}