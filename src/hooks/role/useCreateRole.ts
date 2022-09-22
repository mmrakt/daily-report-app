import { useMutation, useQueryClient } from 'react-query'
import { Role } from '@prisma/client'

const useCreateRole = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (role: Role) =>
            fetch(`/api/roles/${role.id}`, {
                method: 'POST',
                body: JSON.stringify({
                    role,
                }),
            }),
        {
            onSuccess: (data, variables) => {
                queryClient.resetQueries([
                    'roles',
                    {
                        id: variables[0].id,
                    },
                ])
            },
        }
    )
}

export { useCreateRole }
