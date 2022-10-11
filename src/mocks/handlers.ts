import { rest } from 'msw'
import categories from './api/categories'

export const handlers = [rest.get('/api/categories', categories.get)]
