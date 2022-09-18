import { useQuery, UseQueryResult } from 'react-query'
import { Role } from '@prisma/client'

const useFetchRoles = (): UseQueryResult<Role[]> => {
    return useQuery<Role[]>(['roles'], async () => {
        const res = await fetch('api/roles')
        return res.json()
    })
}

export { useFetchRoles }
