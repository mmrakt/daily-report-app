import { useQuery, UseQueryResult } from 'react-query'
import { Project } from '@prisma/client'

const useFetchProjectsByRole = (roleId: number): UseQueryResult<Project[]> => {
    return useQuery<Project[]>(['projects', roleId], async () => {
        const res = await fetch(`/api/roles/${roleId}/projects`)
        return res.json()
    })
}

export { useFetchProjectsByRole }
