import { useQuery, UseQueryResult } from 'react-query'
import { CategoryAndRoleIds } from '../../types/index'

const useFetchCategories = (): UseQueryResult<CategoryAndRoleIds[]> => {
    return useQuery<CategoryAndRoleIds[]>(['categories'], async () => {
        const res = await fetch(`http://localhost:3000/api/categories`)
        return res.json()
    })
}

export { useFetchCategories }
