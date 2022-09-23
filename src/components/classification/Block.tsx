import React from 'react'
import LoadingSpinner from '../common/LoadingSpinner'
import { useFetchProjects } from '@/hooks/project/useFetchProjects'
import { useFetchCategories } from '@/hooks/category/useFetchCategories'
import { useFetchRoles } from '@/hooks/role/useFetchRoles'
import Content from './Content'
import useUpdateRoles from '@/hooks/role/useUpdateRoles'
import useUpdateProjects from '../../hooks/project/useUpdateProjects'
import useUpdateCategories from '../../hooks/category/useUpdateCategories'
import useDisableProjects from '../../hooks/project/useDisableProjects'
import useDisableCategories from '../../hooks/category/useDisableCategories'
import useDisableRoles from '../../hooks/role/useDisableRoles'

const ProjectsBlock: React.VFC = () => {
    const { data: projects, isLoading } = useFetchProjects()
    const updateProjectsMutation = useUpdateProjects()
    const disableProjectsMutation = useDisableProjects()

    if (isLoading) return <LoadingSpinner />
    return (
        <>
            <Content
                classifications={projects}
                label="プロジェクト"
                updateMutation={updateProjectsMutation}
                disableMutation={disableProjectsMutation}
            />
        </>
    )
}

const CategoriesBlock: React.VFC = () => {
    const { data: categories, isLoading } = useFetchCategories()
    const updateCategoriesMutation = useUpdateCategories()
    const disableCategoriesMutation = useDisableCategories()
    if (isLoading) return <LoadingSpinner />

    return (
        <>
            <Content
                classifications={categories}
                label="カテゴリー"
                updateMutation={updateCategoriesMutation}
                disableMutation={disableCategoriesMutation}
            />
        </>
    )
}

const RolesBlock: React.VFC = () => {
    const { data: roles, isLoading } = useFetchRoles()
    const updateRolesMutation = useUpdateRoles()
    const disableRolesMutation = useDisableRoles()

    if (isLoading) return <LoadingSpinner />

    return (
        <>
            <Content
                classifications={roles}
                label="ロール"
                updateMutation={updateRolesMutation}
                disableMutation={disableRolesMutation}
            />
        </>
    )
}

export { ProjectsBlock, CategoriesBlock, RolesBlock }
