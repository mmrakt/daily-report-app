import { useQuery, UseQueryResult } from 'react-query'
import { Category } from '@prisma/client'

const useFetchCategoriesByRole = (
    roleId: number
): UseQueryResult<Category[]> => {
    return useQuery<Category[]>(['categories', roleId], async () => {
        const res = await fetch(`/api/categories?roleId=${roleId}`)
        return res.json()
    })
}

export { useFetchCategoriesByRole }
