import { server } from '@/mocks/server'
import { render } from '@testing-library/react'
import SearchResultContainer from './SearchResultContainer'
import React from 'react'
import { createQueryWrapper } from '../../../test/utlis/createQueryWrapper'

describe('SearchResultContainer', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('display loading', async () => {
        const { queryWrapper } = createQueryWrapper()
        const { findByText } = render(<SearchResultContainer roleId={1} />, {
            wrapper: queryWrapper,
        })
        expect(await findByText('category001')).toBeInTheDocument()
    })
})
