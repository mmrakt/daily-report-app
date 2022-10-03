import React from 'react'
import Header from '@/components/layout/header'
import Main from '@/components/layout/Main'
import { ERROR_MESSAGES } from '../../consts/index'

const CustomError = React.memo(({ errorCode }: { errorCode: number }) => {
    return (
        <>
            <Header isPermitted={false} />
            <Main>
                <div className="flex justify-center">
                    <h1 className="text-xl">
                        {errorCode} | {ERROR_MESSAGES[403]}
                    </h1>
                </div>
            </Main>
        </>
    )
})

CustomError.displayName = 'CustomError'

export default CustomError
