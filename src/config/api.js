export const DEFAULT_API_BASE_URL = 'http://localhost:5176'

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

export const API_BASE_URL = (configuredBaseUrl || DEFAULT_API_BASE_URL).replace(/\/+$/, '')
