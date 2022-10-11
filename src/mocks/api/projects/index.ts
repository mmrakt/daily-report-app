import { ResponseResolver, MockedRequest, restContext } from 'msw'

const get: ResponseResolver<MockedRequest, typeof restContext> = (
    req,
    res,
    ctx
) => {
    return res(
        ctx.status(200),
        ctx.json([
            {
                id: 1,
                name: 'project001',
            },
            {
                id: 2,
                name: 'project002',
            },
            {
                id: 3,
                name: 'project003',
            },
        ])
    )
}

export default { get }
