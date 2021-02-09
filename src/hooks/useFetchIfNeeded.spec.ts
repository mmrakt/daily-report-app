import { renderHook, act } from '@testing-library/react-hooks'
import axios from 'axios'
import {
    FetchedData,
    useFetchIfNeeded,
    UseFetchIfNeededPayload,
} from './useFetchIfNeeded'

describe('useFetchIfNeeded', () => {
    const mockPayload: UseFetchIfNeededPayload = {
        id: 'testId',
    }
    const mockFetchedData: FetchedData = {
        name: 'test boy',
    }
    let mockGet: jest.Mock
    beforeEach(() => {
        mockGet = jest.fn(() =>
            Promise.resolve({
                data: mockFetchedData,
            })
        )
        ;(axios as any).get = mockGet
    })

    test('payloadに変更がない場合、rerenderが行われても再度fetchされない', async () => {
        //useStateの更新関数を呼ぶ場合はactの中で呼ぶ
        await act(async () => {
            const { waitForNextUpdate, rerender } = renderHook(
                (payload: UseFetchIfNeededPayload) => useFetchIfNeeded(payload),
                {
                    initialProps: mockPayload,
                }
            )
            await waitForNextUpdate()
            rerender(mockPayload)
            await waitForNextUpdate()
        })
        expect(mockGet.mock.calls.length).toBe(1)
    })

    test('payloadに変更がある場合、rerenderが行われたときに再度fetchする', async () => {
        await act(async () => {
            const { waitForNextUpdate, rerender } = renderHook(
                (payload: UseFetchIfNeededPayload) => useFetchIfNeeded(payload),
                {
                    initialProps: mockPayload,
                }
            )
            await waitForNextUpdate()
            rerender({ id: 'testId 2' })
            await waitForNextUpdate()
            rerender({ id: 'testId 3' })
            await waitForNextUpdate()
        })
        expect(mockGet.mock.calls.length).toBe(3)
    })

    // test('unmount時にはクリーンアップ関数が呼ばれる', async () => {
    //     await act(async () => {
    //         const { result, waitFor, unmount } = renderHook(
    //             (payload: UseFetchIfNeededPayload) => useFetchIfNeeded(payload),
    //             {
    //                 initialProps: mockPayload,
    //             }
    //         )
    //         await waitFor(
    //             () => result.current.data?.name === mockFetchedData.name
    //         )
    //         expect(result.current.data?.name).toBe(mockFetchedData.name)
    //         unmount()
    //     })
    // })
})
