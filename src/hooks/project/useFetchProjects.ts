import { useQuery, UseQueryResult } from 'react-query'
import { ProjectAndRoleIds } from '../../types/index'

const useFetchProjects = (): UseQueryResult<ProjectAndRoleIds[]> => {
    return useQuery<ProjectAndRoleIds[]>(['projects'], async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/projects`
        )
        return res.json()
    })
}

export { useFetchProjects }
