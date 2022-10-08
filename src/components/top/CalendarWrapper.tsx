import React from 'react'
import { useFetchAllTasksByDateGroup } from '@/hooks/task/useFetchAllTasksByDateGroup'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import 'react-calendar/dist/Calendar.css'
import Calendar from './Calendar'
import { useSession } from 'next-auth/react'

const CalendarWrapper: React.FC = () => {
    const { data: session, status } = useSession()
    const {
        data: submittedDates,
        isLoading,
        isError,
    } = useFetchAllTasksByDateGroup(session?.user?.id)

    if (status === 'loading' || isLoading) return <LoadingSpinner />

    if (isError) return <p>ERROR</p>

    return <Calendar submittedDates={submittedDates} />
}

export default CalendarWrapper
