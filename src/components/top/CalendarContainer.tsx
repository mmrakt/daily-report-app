import React from 'react'
import { useFetchAllTasksByDateGroup } from '@/hooks/task/useFetchAllTasksByDateGroup'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import 'react-calendar/dist/Calendar.css'
import Calendar from './Calendar'

const CalendarContainer: React.FC = () => {
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
