import { useQuery, UseQueryResult } from 'react-query'
import { Role } from '@prisma/client'

const useFetchRoles = (): UseQueryResult<Role[]> => {
    return useQuery<Role[]>(['roles'], async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/roles`)
        return res.json()
    })
}

export { useFetchRoles }
