import { server } from '@/mocks/server'
import { render, screen } from '@testing-library/react'
import CategoriesContainer from './CategoriesContainer'
import React from 'react'
import { createQueryWrapper } from '../../../test/utlis/createQueryWrapper'
import { CategoryAndRoleIds } from '@/types'
import userEvent from '@testing-library/user-event'

describe('CategoriesContainer', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    const dummyCategories: CategoryAndRoleIds[] = [
        {
            id: 1,
            name: 'category001',
            status: 'enable',
            roles: [
                {
                    roleId: 1,
                },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            name: 'category002',
            status: 'enable',
            roles: [
                {
                    roleId: 2,
                },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 3,
            name: 'category003',
            status: 'enable',
            roles: [
                {
                    roleId: 3,
                },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]

    test('render:categories', async () => {
        const queryWrapper = createQueryWrapper().queryWrapper
        const result = render(
            <CategoriesContainer roleId={1} categories={dummyCategories} />,
            {
                wrapper: queryWrapper,
            }
        )
        expect(await result.findByText('category001')).toBeInTheDocument()
    })

    test('render:submit', async () => {
        const queryWrapper = createQueryWrapper().queryWrapper
        const result = render(
            <CategoriesContainer roleId={1} categories={dummyCategories} />,
            {
                wrapper: queryWrapper,
            }
        )
        expect(await result.queryAllByRole('checkbox')[0]).toBeChecked()
        const user = userEvent.setup()
        const submitButton = screen.queryByRole('button')
        await user.click(submitButton)
        expect(await result.findByText('category001')).toBeInTheDocument()
    })
})
