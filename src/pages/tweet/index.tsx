import React from 'react'
import Layout from '../../components/layout'
import ProtectedRoute from '@/auth/ProtectedRoute'
import TweetList from './TweetList'
import TweetForm from './TweetForm'

const Tweet = (): React.ReactElement => {
    return (
        <ProtectedRoute>
            <Layout title="タイムライン">
                <TweetForm />
                <TweetList />
            </Layout>
        </ProtectedRoute>
    )
}
export default Tweet
