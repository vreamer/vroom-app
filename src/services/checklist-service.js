import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export const getChecklists = () => {
    return axios.get(`${apiUrl}/checklist`)
}

export const updateChecklistStep = (stepTitle, stepImage, checklistId, stepId) => {
    const formData = new FormData()
    formData.append('title', stepTitle)
    formData.append('stepImage', stepImage)
    const headers = {
        headers: {
            'content-type': 'multipart-form-data'
        }
    }
    return axios.put(`${apiUrl}/checklist/${checklistId}/steps/${stepId}`, formData, headers)
}
