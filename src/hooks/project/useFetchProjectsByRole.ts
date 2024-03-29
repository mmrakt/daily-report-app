import { useQuery, UseQueryResult } from 'react-query'
import { Project } from '@prisma/client'

const useFetchProjectsByRole = (roleId: number): UseQueryResult<Project[]> => {
    return useQuery<Project[]>(
        ['projects', roleId],
        async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/roles/${roleId}/projects`
            )
            return res.json()
        },
        {
            enabled: !!roleId,
        }
    )
}

export { useFetchProjectsByRole }
