import React from 'react'
import { useFetchCategories } from '@/hooks/category/useFetchCategories'
import { useFetchProjects } from '@/hooks/project/useFetchProjects'
import { Category, Project } from '@prisma/client'
import LoadingSpinner from '../common/LoadingSpinner'
import { useState, useEffect } from 'react'
import { CategoryAndRoleIds, ProjectAndRoleIds } from '../../types/index'

const TableContainer: React.FC<{ roleId: string }> = ({ roleId }) => {
    const { data: categories, isLoading: isLoadingFetchCategories } =
        useFetchCategories()
    const { data: projects, isLoading: isLoadingFetchProjects } =
        useFetchProjects()

    if (isLoadingFetchCategories || isLoadingFetchProjects)
        return <LoadingSpinner />

    return <Table categories={categories} projects={projects} roleId={roleId} />
}

const Table: React.FC<{
    categories: CategoryAndRoleIds[]
    projects: ProjectAndRoleIds[]
    roleId: string
}> = ({ categories, projects, roleId }) => {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>()
    const [selectedProjects, setSelectedProjects] = useState<Project[]>()

    useEffect(() => {
        setSelectedCategories(extractRegisterdByRoleId(categories))
        setSelectedProjects(extractRegisterdByRoleId(projects))
    }, [categories, projects])

    const extractRegisterdByRoleId = (
        targetArray: CategoryAndRoleIds[] | Project[]
    ) => {
        const result = []
        targetArray.forEach((target) => {
            target.roles.forEach((role) => {
                if (String(role.roleId) === roleId) {
                    result.push(target)
                }
            })
        })
        return result
    }

    return (
        <div className="class">
            <ul className="class"></ul>
        </div>
    )
}

export default TableContainer
