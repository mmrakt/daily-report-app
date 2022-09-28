import React from 'react'
import Link from 'next/link'

const Title = React.memo(() => {
    return (
        <p className="px-8 py-8 font-black text-xl">
            <Link href="/">
                <a>日報ツール</a>
            </Link>
        </p>
    )
})

Title.displayName = 'Title'

export default Title
