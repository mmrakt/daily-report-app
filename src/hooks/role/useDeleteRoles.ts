import { useMutation, useQueryClient } from 'react-query'

const useDeleteRoles = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (ids: number[]) =>
            fetch('/api/roles/', {
                method: 'DELETE',
                body: JSON.stringify({
                    ids,
                }),
            }),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries(['roles'])
            },
        }
    )
}

export default useDeleteRoles
