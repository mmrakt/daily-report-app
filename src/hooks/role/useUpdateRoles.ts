import { useMutation, useQueryClient } from 'react-query'
import { Role } from '@prisma/client'
import { Classification } from '../../types/index'

const useUpdateRoles = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (roles: Role[] | Classification[]) =>
            fetch('/api/roles/', {
                method: 'POST',
                body: JSON.stringify({
                    roles,
                }),
            }),
        {
            onSuccess: (data, variables) => {
                queryClient.resetQueries(['roles'])
            },
        }
    )
}

export default useUpdateRoles
