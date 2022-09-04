import React from 'react'
import Calendar from 'react-calendar'
import Layout from '../components/layout'
import Link from 'next/link'
import DoneIcon from '@material-ui/icons/Done'
import RemoveIcon from '@material-ui/icons/Remove'
import { formatDate } from '@/utils/date'
import styled from 'styled-components'
import { useFetchAllTasksByDateGroup } from '@/hooks/task/useFetchAllTasksByDateGroup'
import LoadingSpinner from '../components/common/LoadingSpinner'

const StyledCalendar = styled(Calendar)`
    margin: 0 auto;
    width: 1000px;
    font-size: 20px;
`

const Index = (): React.ReactElement => {
    const userId = 1
    const { data, isLoading, isError } = useFetchAllTasksByDateGroup(userId)
    if (isLoading) return <LoadingSpinner />
    if (isError) return <p>ERROR</p>

    const getTileContent = ({ date }) => {
        const IsCheckedElement = () => {
            if (data.some((report) => report.date === formatDate(date))) {
                return <DoneIcon color="secondary" />
            } else {
                return <RemoveIcon color="disabled" />
            }
        }

        return (
            <div>
                <Link href={`/submit/${formatDate}`}>
                    <IsCheckedElement />
                </Link>
            </div>
        )
    }
    return (
        <Layout title="提出状況確認">
            <div className="calendarBox">
                <StyledCalendar
                    value={new Date()}
                    tileContent={getTileContent}
                    calendarType="US"
                />
            </div>
        </Layout>
    )
}

export default Index
