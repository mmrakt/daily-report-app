import { useQuery, UseQueryResult } from 'react-query'
import { Category } from '@prisma/client'

const useFetchCategories = (): UseQueryResult<Category[]> => {
    return useQuery<Category[]>(['categories'], async () => {
        const res = await fetch(`/api/categories`)
        return res.json()
    })
}

export { useFetchCategories }
