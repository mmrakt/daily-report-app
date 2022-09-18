import React from 'react'
import { useFetchTasksByDate } from '@/hooks/task/useFetchTasksByDate'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useFetchCategoriesByRole } from '@/hooks/category/useFetchCategoriesByRole'
import { useFetchProjectsByRole } from '@/hooks/project/useFetchProjectsByRole'
import Form from '@/components/top/Form'

const FormContainer: React.FC<{
    selectDate: string
    onSubmit: () => void
}> = ({ selectDate, onSubmit }) => {
    // FIXME:
    const userId = 1
    const roleId = 1
    const { data: submittedTasks, isLoading: isLoadingFetchTasks } =
        useFetchTasksByDate(userId, selectDate)

    const { data: categories, isLoading: isLoadingFeatchCategories } =
        useFetchCategoriesByRole(roleId)
    const { data: projects, isLoading: isLoadingFeatchProjects } =
        useFetchProjectsByRole(roleId)

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
            userId={userId}
            roleId={roleId}
            selectDate={selectDate}
            onSubmit={onSubmit}
        />
    )
}

export default FormContainer
