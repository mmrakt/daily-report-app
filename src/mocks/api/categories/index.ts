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
                name: 'category001',
            },
            {
                id: 2,
                name: 'category002',
            },
            {
                id: 3,
                name: 'category003',
            },
        ])
    )
}

const post: ResponseResolver<MockedRequest, typeof restContext> = (
    req,
    res,
    ctx
) => {
    return res(ctx.status(200))
}

export default { get, post }
