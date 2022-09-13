import React from 'react'
import { Calendar as ReactCalendar } from 'react-calendar'
import styled from 'styled-components'
import { useFetchAllTasksByDateGroup } from '@/hooks/task/useFetchAllTasksByDateGroup'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import dayjs from 'dayjs'
import Modal from 'react-modal'
import Form from '@/components/Form'
import { Task } from '@prisma/client'
import 'react-calendar/dist/Calendar.css'

const StyledCalendar = styled(ReactCalendar)`
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

const CheckMark: React.FC = () => {
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
}

type IProps = {
    submittedDates: Task[]
}

type IProps2 = {
    TileContent: (props: { date: string }) => JSX.Element
    onChange: (date: string) => void
}

const Calendar: React.FC<IProps> = ({ submittedDates }) => {
    const [dates] = React.useState<Task[]>(submittedDates)
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
    const [selectDate, setSelectDate] = React.useState<string>('')

    const MemorizedCalendar = React.memo(
        ({ TileContent, onChange }: IProps2) => {
            const onModalOpen = (date: string) => {
                onChange(date)
            }

            return (
                <StyledCalendar
                    value={new Date()}
                    tileContent={TileContent}
                    calendarType="US"
                    onClickDay={(value) => {
                        onModalOpen(value)
                    }}
                />
            )
        }
    )

    MemorizedCalendar.displayName = 'MemorizedCalendar'

    const TileContent = ({ date }: { date: string }) => {
        if (
            dates.some(
                (report) => report.date === dayjs(date).format('YYYY-MM-DD')
            )
        ) {
            return <CheckMark />
        } else {
            return <div className="text-gray-400">-</div>
        }
    }

    const onModalOpen = React.useCallback(async (date: string) => {
        await setSelectDate(dayjs(date).format('YYYY-MM-DD'))
        setIsModalOpen(true)
    }, [])

    return (
        <div className="calendarBox">
            <MemorizedCalendar
                TileContent={TileContent}
                onChange={(date: string) => {
                    onModalOpen(date)
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
    )
}

const CalendarContainer = (): React.ReactElement => {
    const userId = 1
    const {
        data: submittedDates,
        isLoading,
        isError,
    } = useFetchAllTasksByDateGroup(userId)
    if (isLoading) return <LoadingSpinner />
    if (isError) return <p>ERROR</p>

    return <Calendar submittedDates={submittedDates} />
}

export default CalendarContainer
