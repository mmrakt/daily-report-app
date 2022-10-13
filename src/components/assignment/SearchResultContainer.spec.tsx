import { server } from '@/mocks/server'
import { render, waitForElementToBeRemoved } from '@testing-library/react'
import SearchResultContainer from './SearchResultContainer'
import React from 'react'
import { createQueryWrapper } from '../../../test/utlis/createQueryWrapper'

describe('SearchResultContainer', () => {
    let queryWrapper
    beforeAll(() => {
        queryWrapper = createQueryWrapper().queryWrapper
        server.listen()
    })
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('render:loading', async () => {
        const { asFragment, getByRole } = render(
            <SearchResultContainer roleId={1} />,
            {
                wrapper: queryWrapper,
            }
        )
        expect(asFragment()).toMatchSnapshot()
        const LoadingSpinner = getByRole('loadingSpinner')
        await waitForElementToBeRemoved(LoadingSpinner)
    })

    test('render:fetch categories and projects', async () => {
        const { findByText, queryByText } = render(
            <SearchResultContainer roleId={1} />,
            {
                wrapper: queryWrapper,
            }
        )
        expect(await findByText('category001')).toBeInTheDocument()
        expect(await findByText('project001')).toBeInTheDocument()
        expect(await queryByText('project004')).not.toBeInTheDocument()
    })
})
