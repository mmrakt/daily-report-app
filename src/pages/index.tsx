import React from 'react'
import Calendar from 'react-calendar'
import Layout from '../components/layout'
import Link from 'next/link'
import RemoveIcon from '@material-ui/icons/Remove'
import { formatDate } from '@/utils/date'
import styled from 'styled-components'
import { useFetchAllTasksByDateGroup } from '@/hooks/task/useFetchAllTasksByDateGroup'
import LoadingSpinner from '../components/common/LoadingSpinner'
import dayjs from 'dayjs'
import Modal from 'react-modal'
import Form from '../components/Form'

const StyledCalendar = styled(Calendar)`
    margin: 0 auto;
    width: 1000px;
    font-size: 20px;
`

const modalStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        position: 'absolute',
        top: '10rem',
        left: '20rem',
        right: '20rem',
        bottom: '10rem',
        backgroundColor: 'white',
        padding: '5rem',
    },
}

const Index = (): React.ReactElement => {
    const userId = 1
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
    const [selectDate, setSelectDate] = React.useState<string>('')
    const { data, isLoading, isError } = useFetchAllTasksByDateGroup(userId)
    if (isLoading) return <LoadingSpinner />
    if (isError) return <p>ERROR</p>

    const getTileContent = ({ date }) => {
        const IsCheckedElement = () => {
            if (
                data.some(
                    (report) => report.date === dayjs(date).format('YYYY-MM-DD')
                )
            ) {
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-green-500 mx-auto"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                        />
                    </svg>
                )
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

    const onModalOpen = (date: string) => {
        setSelectDate(dayjs(date).format('YYYY-MM-DD'))
        setIsModalOpen(true)
    }
    return (
        <Layout>
            <div className="calendarBox">
                <StyledCalendar
                    value={new Date()}
                    tileContent={getTileContent}
                    calendarType="US"
                    onClickDay={(value) => {
                        onModalOpen(value)
                    }}
                />
                <Modal
                    isOpen={isModalOpen}
                    style={modalStyle}
                    onRequestClose={() => {
                        setIsModalOpen(false)
                    }}
                    ariaHideApp={false}
                >
                    <Form selectDate={selectDate} />
                </Modal>
            </div>
        </Layout>
    )
}

export default Index
