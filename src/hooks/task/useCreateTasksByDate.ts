import { useMutation, useQueryClient } from 'react-query'

export type CreateTasks = {
    userId: number
    categoryId: number
    projectId: number
    hours: number
    summary: string
    note: string
    date: string
}[]

const useCreateTasksByDate = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (tasks: CreateTasks) =>
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify({
                    tasks,
                }),
            }),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries([
                    'tasks',
                    {
                        userId: variables[0].userId,
                        date: variables[0].date,
                    },
                ])
            },
        }
    )
}

export { useCreateTasksByDate }
