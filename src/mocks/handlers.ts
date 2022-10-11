import { rest } from 'msw'
import categories from './api/categories'
import projects from './api/projects'

export const handlers = [
    rest.get(`http://localhost:3000/api/categories`, categories.get),
    rest.get(`http://localhost:3000/api/projects`, projects.get),
]
