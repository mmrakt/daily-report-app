import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskItem from '../top/Item'
import Submit from '../../pages/submit/[date]'
import { withMockedRouter } from '../../utils/test/withMockedRouter'

afterEach(cleanup)

describe('TaskItem', () => {
    const task = {
        id: '',
        target: true,
        hourId: 0,
        categoryId: 0,
        project: 'MS新基盤',
        ticketTitle: 'test',
        note: 'test',
    }
    const hourList = [
        {
            id: 0,
            hour: 0.25,
        },
        {
            id: 1,
            hour: 0.5,
        },
        {
            id: 2,
            hour: 0.75,
        },
    ]
    const categoryList = [
        {
            id: 0,
            category: 'コーディング',
        },
        {
            id: 1,
            category: 'テスト',
        },
        {
            id: 2,
            category: '会議',
        },
    ]
    const onChange = jest.fn()
    const onDelete = jest.fn()

    test('TaskItemコンポーネントがレンダリングされること', () => {
        //NOTE: table,tbodyタグが含まれないとconsole errorとなる
        render(
            <table>
                <tbody>
                    <TaskItem
                        task={task}
                        hourList={hourList}
                        categoryList={categoryList}
                        onChange={onChange}
                        onDelete={onDelete}
                    />
                </tbody>
            </table>
        )
        expect(screen.getByText('MS新基盤')).toBeInTheDocument()
    })
    test('DeleteIconを一度クリックするとイベントが一度発火されること', () => {
        render(
            <table>
                <tbody>
                    <TaskItem
                        task={task}
                        hourList={hourList}
                        categoryList={categoryList}
                        onChange={onChange}
                        onDelete={onDelete}
                    />
                </tbody>
            </table>
        )
        const deleteButtonElement = screen.getByTestId('delete-icon')
        userEvent.click(deleteButtonElement)
        expect(onDelete).toHaveBeenCalled()
    })

    test('Submitコンポーネントがレンダリングされること', () => {
        render(
            withMockedRouter(
                {
                    query: {
                        dateText: '20200101',
                    },
                },
                <Submit />
            )
        )
    })

    // test('作業を追加できること', () => {
    //     render(withMockedRouter({
    //         query: {
    //             dateText: '20200101'
    //         }
    //     }, <Submit />), )
    //     const addButtonElement = screen.getByTestId('add-button')
    //     userEvent.click(addButtonElement)
    //     expect(handleAddTask).toHaveBeenCalledTimes(1)
    // })
})
