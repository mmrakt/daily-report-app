import { useMutation, useQueryClient } from 'react-query'
import { Category } from '@prisma/client'
import { Classification } from '../../types/index'

const useUpdateCategories = () => {
    const queryClient = useQueryClient()
    return useMutation(
        async (categories: Category[] | Classification[]) =>
            await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
                method: 'POST',
                body: JSON.stringify({
                    categories,
                }),
            }),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries(['categories'])
            },
        }
    )
}

export default useUpdateCategories
