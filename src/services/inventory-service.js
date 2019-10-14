import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export const getInventoryByDate = (date) => {
    return axios.get(`${apiUrl}/inventory/${date}`)
}

export const createInventories = (inventories) => {
    return axios.post(`${apiUrl}/inventory/add`, { inventories })
}

export const getInventoryGroups = () => {
    return axios.get(`${apiUrl}/inventory-group`)
}

export const getInventoryItems = () => {
    return axios.get(`${apiUrl}/inventory-item`)
}

export const createInventoryItem = (inventoryItem) => {
    return axios.post(`${apiUrl}/inventory-item/add`, inventoryItem)
}