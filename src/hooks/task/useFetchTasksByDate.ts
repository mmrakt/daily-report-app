import { useQuery, UseQueryResult } from 'react-query'
import { Task } from '@prisma/client'

const useFetchTasksByDate = (
    userId: number,
    date: string
): UseQueryResult<Task[]> => {
    return useQuery<Task[]>(['tasks', userId], async () => {
        const res = await fetch(`/api/tasks?userId=${userId}&date=${date}`)
        return res.json()
    })
}

export { useFetchTasksByDate }
