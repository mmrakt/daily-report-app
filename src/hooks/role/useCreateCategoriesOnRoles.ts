import { useMutation, useQueryClient } from 'react-query'
import { DISPLAY_NOTICE_MILLISECOUND } from '../../consts/index'

export type CategoriesOnRoles = {
    roleId: number
    categoryId: number
}[]

const useCreateCategoriesOnRoles = () => {
    const queryClient = useQueryClient()
    return useMutation(
        async (categoriesOnRoles: CategoriesOnRoles) =>
            await fetch(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/roles/${categoriesOnRoles[0].roleId}/categories`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        categoriesOnRoles,
                    }),
                }
            ),
        {
            onSuccess: (data, variables) => {
                // TODO: setTimeoutを使わずにcache破棄のタイミングを遅延させる
                setTimeout(() => {
                    queryClient.resetQueries([
                        'categoriesOnRoles',
                        {
                            userId: variables[0].roleId,
                        },
                    ])
                }, DISPLAY_NOTICE_MILLISECOUND)
            },
        }
    )
}

export { useCreateCategoriesOnRoles }
