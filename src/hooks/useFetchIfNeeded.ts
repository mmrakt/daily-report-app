import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

export type FetchedData = {
    name: string
}

export type UseFetchIfNeededPayload = {
    id: string
}

//初回時：fetch()を実行してsetDataにセットする
//更新時：再度コールバックを実行する
//アンマウント時：setDataをnullにする
export const useFetchIfNeeded = (
    payload: UseFetchIfNeededPayload
): FetchedData | null => {
    const [, setData] = useState<FetchedData | null>(null)
    const fetch = useCallback(async () => {
        const fetchedData = await axios.get<FetchedData>('path/to/get', {
            params: payload,
        })
        setData(fetchedData.data)
    }, [payload])

    useEffect(() => {
        fetch()
        return () => {
            setData(null)
        }
    }, [fetch])

    return null
}
