import { server } from '@/mocks/server'
import { render, screen, waitFor } from '@testing-library/react'
import Content from './Content'
import React from 'react'
import { createQueryWrapper } from '../../../test/utlis/createQueryWrapper'
import { Category } from '@prisma/client'
import useUpdateCategories from '../../hooks/category/useUpdateCategories'
import useDisableCategories from '../../hooks/category/useDisableCategories'

describe('Content', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    const dummyClassifications: Category[] = [
        {
            id: 1,
            name: 'category001',
            status: 'enable',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            name: 'category002',
            status: 'enable',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 3,
            name: 'category003',
            status: 'enable',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]

    test('render:categories', async () => {
        const queryWrapper = createQueryWrapper().queryWrapper
        const result = render(
            <Content
                classifications={dummyClassifications}
                label="カテゴリー"
                updateMutation={useUpdateCategories()}
                disableMutation={useDisableCategories()}
            />,
            {
                wrapper: queryWrapper,
            }
        )
        expect(await result.findByText('カテゴリー')).toBeInTheDocument()
    })
})
