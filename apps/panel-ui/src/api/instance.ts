import axios from "axios"

export const API_HOST = "https://api.stege.codes"

export const API = axios.create({
  baseURL: API_HOST,
})
