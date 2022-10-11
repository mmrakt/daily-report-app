import { useQuery, UseQueryResult } from 'react-query'
import { CategoryAndRoleIds } from '../../types/index'

const useFetchCategories = (): UseQueryResult<CategoryAndRoleIds[]> => {
    return useQuery<CategoryAndRoleIds[]>(['categories'], async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/categories`
        )
        return res.json()
    })
}

export { useFetchCategories }
