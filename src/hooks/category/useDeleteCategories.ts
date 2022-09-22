import { useMutation, useQueryClient } from 'react-query'

const useDeleteCategories = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (ids: number[]) =>
            fetch('/api/categories', {
                method: 'DELETE',
                body: JSON.stringify({
                    ids,
                }),
            }),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries(['categories'])
            },
        }
    )
}

export default useDeleteCategories
