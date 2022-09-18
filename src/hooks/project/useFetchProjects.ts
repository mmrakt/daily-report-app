import { useQuery, UseQueryResult } from 'react-query'
import { Project } from '@prisma/client'

const useFetchProjects = (): UseQueryResult<Project[]> => {
    return useQuery<Project[]>(['projects'], async () => {
        const res = await fetch(`/api/projects`)
        return res.json()
    })
}

export { useFetchProjects }
