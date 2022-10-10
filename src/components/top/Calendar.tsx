import React from 'react'
import { Calendar as ReactCalendar } from 'react-calendar'
import dayjs from 'dayjs'
import Modal from 'react-modal'
import { Task } from '@prisma/client'
import FormWrapper from './FormWrapper'

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

    const getTileClassName = ({ date }: { date: string }): string => {
        console.log(date)
        return (submittedDates as any).some(
            (report) => report.date === dayjs(date).format('YYYY-MM-DD')
        )
            ? 'bg-green-200'
            : ''
    }

    const onModalOpen = React.useCallback(async (date: string) => {
        await setSelectDate(dayjs(date).format('YYYY-MM-DD'))
        setIsModalOpen(true)
    }, [])

    return (
        <div className="border-t-2 border-r-2 border-b-2 border-[#cccccc]">
            <ReactCalendar
                value={new Date()}
                formatDay={(locale, date) => dayjs(date).format('D')}
                calendarType="US"
                onClickDay={(value) => {
                    onModalOpen(value)
                }}
                tileClassName={getTileClassName}
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
