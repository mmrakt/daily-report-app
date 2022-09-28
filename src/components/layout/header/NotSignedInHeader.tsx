import React from 'react'
import Title from './Title'

const NotSignedInHeader = React.memo(() => {
    return (
        <header className="shadow-lg h-20 flex items-center">
            <Title />
        </header>
    )
})

NotSignedInHeader.displayName = 'NotSignedInHeader'

export default NotSignedInHeader
