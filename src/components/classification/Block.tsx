import React from 'react'
import LoadingSpinner from '../common/LoadingSpinner'
import { useFetchProjects } from '@/hooks/project/useFetchProjects'
import { useFetchCategories } from '@/hooks/category/useFetchCategories'
import { useFetchRoles } from '@/hooks/role/useFetchRoles'
import Content from './Content'

const ProjectsBlock: React.VFC = () => {
    const { data: projects, isLoading } = useFetchProjects()

    if (isLoading) return <LoadingSpinner />
    return (
        <>
            <Content classifications={projects} label="プロジェクト" />
        </>
    )
}

const CategoriesBlock: React.VFC = () => {
    const { data: categories, isLoading } = useFetchCategories()
    if (isLoading) return <LoadingSpinner />

    return (
        <>
            <Content classifications={categories} label="カテゴリー" />
        </>
    )
}

const RolesBlock: React.VFC = () => {
    const { data: roles, isLoading } = useFetchRoles()
    if (isLoading) return <LoadingSpinner />

    return (
        <>
            <Content classifications={roles} label="ロール" />
        </>
    )
}

export { ProjectsBlock, CategoriesBlock, RolesBlock }
