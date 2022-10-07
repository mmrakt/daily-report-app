import { useQuery, UseQueryResult } from 'react-query'
import { Task } from '@prisma/client'

const useFetchTasksByDate = (
    userId: string,
    date: string
): UseQueryResult<Task[]> => {
    return useQuery<Task[]>(
        ['tasks', { date: date, userId: userId }],
        async () => {
            const res = await fetch(`/api/tasks/${date}/?userId=${userId}`)
            return res.json()
        }
    )
}

export { useFetchTasksByDate }
