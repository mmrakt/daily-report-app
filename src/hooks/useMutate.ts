import { useQueryClient, useMutation, UseMutationResult } from 'react-query'

type IProps = {
    path: string
    method: string
    body?: string
    key: string
}
export const useMutate = (
    props: IProps
): UseMutationResult<Response, unknown, void, unknown> => {
    const queryClient = useQueryClient()
    return useMutation(
        () => {
            return fetch(props.path, {
                method: props.method,
                body: props.body,
            })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(props.key)
            },
        }
    )
}
