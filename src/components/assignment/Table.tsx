import React from 'react'
import { useFetchCategories } from '@/hooks/category/useFetchCategories'
import { useFetchProjects } from '@/hooks/project/useFetchProjects'
import { Category, Project } from '@prisma/client'
import LoadingSpinner from '../common/LoadingSpinner'
import { useState, useEffect } from 'react'
import { CategoryAndRoleIds, ProjectAndRoleIds } from '../../types/index'
import Button from '@/components/common/Button'
import { useCreateCategoriesOnRoles } from '@/hooks/role/useCreateCategoriesOnRoles'
import { CategoriesOnRoles } from '../../hooks/role/useCreateCategoriesOnRoles'
import categories from '@/pages/api/categories'
import { DISPLAY_NOTICE_MILLISECOUND } from '../../consts/index'
import { toast, ToastContainer } from 'react-toastify'

const TableContainer: React.FC<{ roleId: number }> = ({ roleId }) => {
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
    roleId: number
}> = ({ categories, projects, roleId }) => {
    const [selectedCategories, setSelectedCategories] = useState<Category[]>()
    const [selectedProjects, setSelectedProjects] = useState<Project[]>()
    const createCategoriesOnRoles = useCreateCategoriesOnRoles()

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
                if (role.roleId === roleId) {
                    result.push(target)
                }
            })
        })
        return result
    }

    const handleCheck = (targetId: number) => {
        if (existsById(targetId)) {
            setSelectedCategories(
                selectedCategories.filter(
                    (selectedCategory) => selectedCategory.id !== targetId
                )
            )
        } else {
            const checkedCategory = categories.find(
                (category) => category.id === targetId
            )
            setSelectedCategories([...selectedCategories, checkedCategory])
        }
    }

    const existsById = (targetId: number) => {
        return selectedCategories.findIndex(
            (selectedCategory) => selectedCategory.id === targetId
        ) !== -1
            ? true
            : false
    }

    const handleSubmit = async () => {
        try {
            const categoriesOnRoles: CategoriesOnRoles = []
            selectedCategories.forEach((category) => {
                categoriesOnRoles.push({
                    categoryId: category.id,
                    roleId: roleId,
                })
            })
            await createCategoriesOnRoles.mutate(categoriesOnRoles)
            await toast.success('更新完了', {
                autoClose: DISPLAY_NOTICE_MILLISECOUND,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="bg-gray-200 rounded p-5">
                <div className="p-3">
                    <h2 className="text-lg bold">カテゴリー</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                    {categories &&
                        selectedCategories &&
                        categories.map((category) => (
                            <div key={category.id}>
                                <input
                                    checked={existsById(category.id)}
                                    onChange={(e) => {
                                        handleCheck(Number(e.target.value))
                                    }}
                                    id="checked-checkbox"
                                    type="checkbox"
                                    value={category.id}
                                    className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                                />
                                <label
                                    htmlFor="checked-checkbox"
                                    className="ml-2 text-sm font-medium"
                                >
                                    {category.name}
                                </label>
                            </div>
                        ))}
                </div>
                <div className="flex">
                    <Button
                        text="更新"
                        type="submit"
                        color="primary"
                        onClickEvent={handleSubmit}
                        className="ml-auto"
                    />
                </div>
            </div>
        </>
    )
}

export default TableContainer
