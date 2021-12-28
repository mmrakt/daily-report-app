import React from 'react'
import Calendar from 'react-calendar'
import Layout from '../../components/layout'
import Link from 'next/link'
import styles from './index.module.css'
import { useGetReportsDateTextQuery } from '@/generated/graphql'
import DoneIcon from '@material-ui/icons/Done'
import RemoveIcon from '@material-ui/icons/Remove'
import { formatDate } from '@/utils/date'
import styled from 'styled-components'

const StyledCalendar = styled(Calendar)`
    margin: 0 auto;
    width: 1000px;
    font-size: 20px;
`

const Check = (): React.ReactElement => {
    const hoge = ''
    const { loading, error, data } = useGetReportsDateTextQuery()
    if (loading) return <p>Loading...</p>
    if (error) return <p>ERROR</p>

    const getTileContent = ({ date }) => {
        const IsCheckedElement = () => {
            if (
                data.reports.some(
                    (report) => report.dateText === formatDate(date)
                )
            ) {
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

export default Check
