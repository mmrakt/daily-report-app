import { useQuery, UseQueryResult } from 'react-query'
import { Task } from '@prisma/client'

const useFetchAllTasksByDateGroup = (
    userId: string
): UseQueryResult<Pick<Task, 'date'>[]> => {
    return useQuery<Pick<Task, 'date'>[]>(
        ['tasks', { userId: userId }],
        async () => {
            const res = await fetch(`/api/tasks?userId=${userId}`)
            return res.json()
        },
        {
            enabled: !!userId,
        }
    )
}

export { useFetchAllTasksByDateGroup }
