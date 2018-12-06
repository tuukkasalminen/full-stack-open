import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async(updatedObject) => {
  const id = updatedObject._id
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
  return response.data
}

const remove = async (deletedObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  await axios.delete(`${baseUrl}/${deletedObject._id}`, config)
}

export default { getAll, setToken, create, like, remove }