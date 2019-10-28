import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export const getChecklists = () => {
    return axios.get(`${apiUrl}/checklist`)
}

export const updateChecklistStep = (stepTitle, checklistId, stepId) => {
    return axios.put(`${apiUrl}/checklist/${checklistId}/steps/${stepId}`, { title: stepTitle })
}

export const updateChecklistStepImage = (imageFile, checklistId, stepId) => {
    const formData = new FormData()
    formData.append('stepImage', imageFile)
    const headers = {
        headers: {
            'content-type': 'multipart-form-data'
        }
    }
    return axios.post(`${apiUrl}/checklist/${checklistId}/steps/${stepId}/image`, formData, headers)
}