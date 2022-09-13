import React from 'react'
import { Calendar as ReactCalendar } from 'react-calendar'
import styled from 'styled-components'
import dayjs from 'dayjs'
import Modal from 'react-modal'
import { Task } from '@prisma/client'
import 'react-calendar/dist/Calendar.css'
import CheckMark from '../common/CheckMark'
import FormContainer from './FormContainer'

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

type MemorizedCalendarProps = {
    TileContent: (props: { date: string }) => JSX.Element
    onChange: (date: string) => void
}

const Calendar: React.FC<{ submittedDates: Task[] }> = ({ submittedDates }) => {
    const [dates] = React.useState<Task[]>(submittedDates)
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
    const [selectDate, setSelectDate] = React.useState<string>('')

    const MemorizedCalendar = React.memo(
        ({ TileContent, onChange }: MemorizedCalendarProps) => {
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
                <FormContainer selectDate={selectDate} />
            </Modal>
        </div>
    )
}

export default Calendar