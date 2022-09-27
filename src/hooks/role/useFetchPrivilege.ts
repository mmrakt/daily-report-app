import { useQuery, UseQueryResult } from 'react-query'
import { Role } from '@prisma/client'

const useFetchPrivilege = (
    userId: string
): UseQueryResult<Pick<Role, 'privilege'>> => {
    return useQuery<Pick<Role, 'privilege'>>(['privilege'], async () => {
        const res = await fetch(`api/users/${userId}/role`)
        return res.json()
    })
}

export { useFetchPrivilege }
