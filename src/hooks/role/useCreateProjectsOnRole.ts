import { useMutation, useQueryClient } from 'react-query'
import { DISPLAY_NOTICE_MILLISECOUND } from '../../consts/index'

export type ProjectsOnRoles = {
    roleId: number
    projectId: number
}[]

const useCreateProjectsOnRoles = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (projectsOnRoles: ProjectsOnRoles) =>
            fetch(`/api/roles/${projectsOnRoles[0].roleId}/projects`, {
                method: 'POST',
                body: JSON.stringify({
                    projectsOnRoles,
                }),
            }),
        {
            onSuccess: (data, variables) => {
                // TODO: setTimeoutを使わずにcache破棄のタイミングを遅延させる
                setTimeout(() => {
                    queryClient.resetQueries([
                        'projectsOnRole',
                        {
                            userId: variables[0].roleId,
                        },
                    ])
                }, DISPLAY_NOTICE_MILLISECOUND)
            },
        }
    )
}

export { useCreateProjectsOnRoles }
