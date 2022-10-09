import React from 'react'

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <main className="mt-20 mx-auto max-w-screen-md">{children}</main>
}

export default Main
