import { useMutation, useQueryClient } from 'react-query'
import { Project } from '@prisma/client'
import { Classification } from '../../types/index'

const useUpdateProjects = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (projects: Project[] | Classification[]) =>
            fetch('/api/projects', {
                method: 'POST',
                body: JSON.stringify({
                    projects,
                }),
            }),
        {
            onSuccess: (data, variables) => {
                queryClient.resetQueries(['projects'])
            },
        }
    )
}

export default useUpdateProjects
