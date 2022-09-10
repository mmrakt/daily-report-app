import { useQuery, UseQueryResult } from 'react-query'
import { Project } from '@prisma/client'

const useFetchProjects = (roleId: number): UseQueryResult<Project[]> => {
    return useQuery<Project[]>(['projects', roleId], async () => {
        const res = await fetch(`/api/projects?roleId=${roleId}`)
        return res.json()
    })
}

export { useFetchProjects }