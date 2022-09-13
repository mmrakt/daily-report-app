import React from 'react'
import { useFetchTasksByDate } from '@/hooks/task/useFetchTasksByDate'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useFetchCategories } from '@/hooks/category/useFetchCategories'
import { useFetchProjects } from '@/hooks/project/useFetchProjects'
import Form from '@/components/top/Form'

const FormContainer: React.FC<{ selectDate: string }> = ({ selectDate }) => {
    // FIXME:
    const userId = 1
    const roleId = 1
    const { data: submittedTasks, isLoading: isLoadingFetchTasks } =
        useFetchTasksByDate(userId, selectDate)

    const { data: categories, isLoading: isLoadingFeatchCategories } =
        useFetchCategories(roleId)
    const { data: projects, isLoading: isLoadingFeatchProjects } =
        useFetchProjects(roleId)

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
        />
    )
}

export default FormContainer
