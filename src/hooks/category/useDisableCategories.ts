import { useMutation, useQueryClient } from 'react-query'

const useDisableCategories = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (ids: number[]) =>
            fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
                method: 'PATCH',
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

export default useDisableCategories
