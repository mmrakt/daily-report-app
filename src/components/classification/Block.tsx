import React from 'react'
import LoadingSpinner from '../common/LoadingSpinner'
import { useFetchProjects } from '@/hooks/project/useFetchProjects'
import { useFetchCategories } from '@/hooks/category/useFetchCategories'
import { useFetchRoles } from '@/hooks/role/useFetchRoles'
import Content from './Content'
import useUpdateRoles from '@/hooks/role/useUpdateRoles'
import useUpdateProjects from '../../hooks/project/useUpdateProjects'
import useUpdateCategories from '../../hooks/category/useUpdateCategories'
import useDeleteProjects from '../../hooks/project/useDeleteProjects'
import useDeleteCategories from '../../hooks/category/useDeleteCategories'
import useDeleteRoles from '../../hooks/role/useDeleteRoles'

const ProjectsBlock: React.VFC = () => {
    const { data: projects, isLoading } = useFetchProjects()
    const updateProjectsMutation = useUpdateProjects()
    const deleteProjectsMutation = useDeleteProjects()

    if (isLoading) return <LoadingSpinner />
    return (
        <>
            <Content
                classifications={projects}
                label="プロジェクト"
                updateMutation={updateProjectsMutation}
                deleteMutation={deleteProjectsMutation}
            />
        </>
    )
}

const CategoriesBlock: React.VFC = () => {
    const { data: categories, isLoading } = useFetchCategories()
    const updateCategoriesMutation = useUpdateCategories()
    const deleteCategoriesMutation = useDeleteCategories()
    if (isLoading) return <LoadingSpinner />

    return (
        <>
            <Content
                classifications={categories}
                label="カテゴリー"
                updateMutation={updateCategoriesMutation}
                deleteMutation={deleteCategoriesMutation}
            />
        </>
    )
}

const RolesBlock: React.VFC = () => {
    const { data: roles, isLoading } = useFetchRoles()
    const updateRolesMutation = useUpdateRoles()
    const deleteRolesMutation = useDeleteRoles()

    if (isLoading) return <LoadingSpinner />

    return (
        <>
            <Content
                classifications={roles}
                label="ロール"
                updateMutation={updateRolesMutation}
                deleteMutation={deleteRolesMutation}
            />
        </>
    )
}

export { ProjectsBlock, CategoriesBlock, RolesBlock }
