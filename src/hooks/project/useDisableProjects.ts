import { useMutation, useQueryClient } from 'react-query'

const useDisableProjects = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (ids: number[]) =>
            fetch('/api/projects', {
                method: 'PATCH',
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

export default useDisableProjects
