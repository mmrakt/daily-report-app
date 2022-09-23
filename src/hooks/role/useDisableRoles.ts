import { useMutation, useQueryClient } from 'react-query'

const useDisableRoles = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (ids: number[]) =>
            fetch('/api/roles/', {
                method: 'PATCH',
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

export default useDisableRoles
