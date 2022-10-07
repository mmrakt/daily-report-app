import React from 'react'
import { useFetchTasksByDate } from '@/hooks/task/useFetchTasksByDate'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useFetchCategoriesByRole } from '@/hooks/category/useFetchCategoriesByRole'
import { useFetchProjectsByRole } from '@/hooks/project/useFetchProjectsByRole'
import Form from '@/components/top/Form'
import { useSession } from 'next-auth/react'

const FormWrapper: React.FC<{
    selectDate: string
    onModalClose: () => void
}> = ({ selectDate, onModalClose }) => {
    const { data: session, status } = useSession()
    const fetchTasksByDate = useFetchTasksByDate
    const fetchCategoriesByRole = useFetchCategoriesByRole
    const fetchProjectsByRole = useFetchProjectsByRole

    if (status === 'loading') return <LoadingSpinner />

    const { id, roleId } = session?.user
    const { data: submittedTasks, isLoading: isLoadingFetchTasks } =
        fetchTasksByDate(id, selectDate)
    const { data: categories, isLoading: isLoadingFeatchCategories } =
        fetchCategoriesByRole(roleId)
    const { data: projects, isLoading: isLoadingFeatchProjects } =
        fetchProjectsByRole(roleId)

    if (
        isLoadingFetchTasks ||
        isLoadingFeatchCategories ||
        isLoadingFeatchProjects
    )
        return <LoadingSpinner />

    return (
        <Form
            submittedTasks={submittedTasks}
            categories={categories}
            projects={projects}
            userId={id}
            roleId={roleId}
            selectDate={selectDate}
            onModalClose={onModalClose}
            key={selectDate}
        />
    )
}

export default FormWrapper
