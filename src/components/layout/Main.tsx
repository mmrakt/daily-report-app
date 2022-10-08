import React from 'react'

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <main className="max-w-screen-md mx-auto mt-20 ">{children}</main>
}

export default Main
