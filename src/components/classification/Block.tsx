import React from 'react'
import LoadingSpinner from '../common/LoadingSpinner'
import { useFetchProjects } from '@/hooks/project/useFetchProjects'
import { useFetchCategories } from '@/hooks/category/useFetchCategories'
import { useFetchRoles } from '@/hooks/role/useFetchRoles'
import Content from './Content'
import useUpdateRoles from '@/hooks/role/useUpdateRoles'
import useUpdateProjects from '../../hooks/project/useUpdateProjects'
import useUpdateCategories from '../../hooks/category/useUpdateCategories'

const ProjectsBlock: React.VFC = () => {
    const { data: projects, isLoading } = useFetchProjects()
    const updateProjectsMutation = useUpdateProjects()

    if (isLoading) return <LoadingSpinner />
    return (
        <>
            <Content
                classifications={projects}
                label="プロジェクト"
                mutation={updateProjectsMutation}
            />
        </>
    )
}

const CategoriesBlock: React.VFC = () => {
    const { data: categories, isLoading } = useFetchCategories()
    const updateCategoriesMutation = useUpdateCategories()
    if (isLoading) return <LoadingSpinner />

    return (
        <>
            <Content
                classifications={categories}
                label="カテゴリー"
                mutation={updateCategoriesMutation}
            />
        </>
    )
}

const RolesBlock: React.VFC = () => {
    const { data: roles, isLoading } = useFetchRoles()
    const updateRolesMutation = useUpdateRoles()

    if (isLoading) return <LoadingSpinner />

    return (
        <>
            <Content
                classifications={roles}
                label="ロール"
                mutation={updateRolesMutation}
            />
        </>
    )
}

export { ProjectsBlock, CategoriesBlock, RolesBlock }
