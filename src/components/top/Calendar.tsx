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
        maxWidth: '1000px',
        minWidth: '700px',
        margin: '0 auto',
        position: 'absolute',
        top: '10rem',
        left: '20rem',
        right: '20rem',
        bottom: '10rem',
        backgroundColor: 'white',
        padding: '5rem',
    },
}

type CalenderProps = {
    dates: Pick<Task, 'date'>[]
}

const Calendar: React.FC<{ submittedDates: CalenderProps }> = ({
    submittedDates,
}) => {
    const [dates] = React.useState<CalenderProps>(submittedDates)
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
    const [selectDate, setSelectDate] = React.useState<string>('')

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
        <div className="">
            <StyledCalendar
                value={new Date()}
                tileContent={TileContent}
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
                <FormContainer
                    onSubmit={() => {
                        setIsModalOpen(false)
                    }}
                    selectDate={selectDate}
                />
            </Modal>
        </div>
    )
}

export default Calendar
