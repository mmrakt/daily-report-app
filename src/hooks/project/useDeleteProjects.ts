import { useMutation, useQueryClient } from 'react-query'

const useDeleteProjects = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (ids: number[]) =>
            fetch('/api/projects', {
                method: 'DELETE',
                body: JSON.stringify({
                    ids,
                }),
            }),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries(['projects'])
            },
        }
    )
}

export default useDeleteProjects
