import { rest } from 'msw'
import categories from './api/categories'
import projects from './api/projects'

const appUrl = process.env.NEXT_PUBLIC_APP_URL
export const handlers = [
    rest.get(`${appUrl}/api/categories`, categories.get),
    rest.get(`${appUrl}/api/projects`, projects.get),
    rest.post(`${appUrl}/api/roles/1/categories`, categories.post),
]
