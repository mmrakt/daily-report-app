import React from 'react'
import { Calendar as ReactCalendar } from 'react-calendar'
import styled from 'styled-components'
import dayjs from 'dayjs'
import Modal from 'react-modal'
import { Task } from '@prisma/client'
import CheckMark from '../common/icon/CheckMark'
import FormWrapper from './FormWrapper'

const StyledCalendar = styled(ReactCalendar)`
    margin: 0 auto;
    width: 1000px;
    font-size: 16px;
    border-style: none;
    .react-calendar__navigation {
        margin-bottom: 0px;
        font-size: 20px;
        border-left: 1px solid #cccccc;
    }
    .react-calendar__tile {
        aspect-ratio: 1 / 1;
        border-top: 1px solid #cccccc;
        border-left: 1px solid #cccccc;
        display: flex;
    }
    .react-calendar__month-view__weekdays {
        border-left: 1px solid #cccccc;
        font-size: 16px;
    }
`

const modalStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        maxWidth: '1200px',
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

const Calendar: React.FC<{ submittedDates: Pick<Task, 'date'>[] }> = ({
    submittedDates,
}) => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
    const [selectDate, setSelectDate] = React.useState<string>('')

    const TileContent = ({ date }: { date: string }) => {
        if (
            (submittedDates as any).some(
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
        <div className="border-t-2 border-r-2 border-b-2 border-[#cccccc]">
            <StyledCalendar
                value={new Date()}
                formatDay={(locale, date) => dayjs(date).format('D')}
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
                <FormWrapper
                    onModalClose={() => {
                        setIsModalOpen(false)
                    }}
                    selectDate={selectDate}
                />
            </Modal>
        </div>
    )
}

export default Calendar
