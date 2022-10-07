import { useMutation, useQueryClient } from 'react-query'
import { DISPLAY_NOTICE_MILLISECOUND } from '../../consts/index'

export type CreateTask = {
    userId: string
    categoryId: number
    projectId: number
    hours: number
    summary: string
    note: string
    date: string
}

const useCreateTasksByDate = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (tasks: CreateTask[]) =>
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify({
                    tasks,
                }),
            }),
        {
            onSuccess: (data, variables) => {
                // TODO: setTimeoutを使わずにcache破棄のタイミングを遅延させる
                setTimeout(() => {
                    queryClient.resetQueries([
                        'tasks',
                        {
                            userId: variables[0].userId,
                        },
                    ])
                }, DISPLAY_NOTICE_MILLISECOUND)
            },
        }
    )
}

export { useCreateTasksByDate }
