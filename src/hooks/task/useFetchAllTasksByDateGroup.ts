import { useQuery, UseQueryResult } from 'react-query'
import { Task } from '@prisma/client'

const useFetchAllTasksByDateGroup = (
    userId: number
): UseQueryResult<Task[]> => {
    return useQuery<Task[]>(['tasks', { userId: userId }], async () => {
        const res = await fetch(`/api/tasks?userId=${userId}`)
        return res.json()
    })
}

export { useFetchAllTasksByDateGroup }
