import React from 'react'
import { useFetchCategories } from '@/hooks/category/useFetchCategories'
import { useFetchProjects } from '@/hooks/project/useFetchProjects'
import LoadingSpinner from '../common/LoadingSpinner'
import CategoriesContainer from './CategoriesContainer'
import ProjectsContainer from './ProjectsContainer'

const SearchResultContainer: React.FC<{ roleId: number }> = ({ roleId }) => {
    const { data: categories, isLoading: isLoadingFetchCategories } =
        useFetchCategories()
    const { data: projects, isLoading: isLoadingFetchProjects } =
        useFetchProjects()

    if (isLoadingFetchCategories || isLoadingFetchProjects)
        return <LoadingSpinner />

    return (
        <>
            <CategoriesContainer categories={categories} roleId={roleId} />
            <ProjectsContainer projects={projects} roleId={roleId} />
        </>
    )
}

export default SearchResultContainer
