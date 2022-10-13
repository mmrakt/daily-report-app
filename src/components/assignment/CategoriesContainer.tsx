import React from 'react'
import { Category } from '@prisma/client'
import { useState, useEffect, useCallback } from 'react'
import { CategoryAndRoleIds } from '../../types/index'
import Button from '@/components/common/Button'
import { useCreateCategoriesOnRoles } from '@/hooks/role/useCreateCategoriesOnRoles'
import { CategoriesOnRoles } from '../../hooks/role/useCreateCategoriesOnRoles'
import { DISPLAY_NOTICE_MILLISECOUND } from '../../consts/index'
import { toast, ToastContainer } from 'react-toastify'

const CategoriesContainer: React.FC<{
    categories: CategoryAndRoleIds[]
    roleId: number
}> = ({ categories, roleId }) => {
    const [selectCategories, setSelectCategories] = useState<Category[]>()
    const createCategoriesOnRoles = useCreateCategoriesOnRoles()

    const extractRegisterdByRoleId = useCallback(
        (targetArray: CategoryAndRoleIds[]) => {
            const result = []
            targetArray.forEach((target) => {
                if (target.roles?.length) {
                    target.roles.forEach((role) => {
                        if (role.roleId === roleId) {
                            result.push(target)
                        }
                    })
                }
            })
            return result
        },
        [roleId]
    )

    useEffect(() => {
        const extractedCategories = extractRegisterdByRoleId(categories)
        setSelectCategories(extractedCategories)
    }, [categories, extractRegisterdByRoleId])

    const handleCheck = (targetId: number) => {
        if (existsById(targetId)) {
            setSelectCategories(
                selectCategories.filter(
                    (selectedCategory) => selectedCategory.id !== targetId
                )
            )
        } else {
            const checkedCategory = categories.find(
                (category) => category.id === targetId
            )
            setSelectCategories([...selectCategories, checkedCategory])
        }
    }

    const existsById = (targetId: number) => {
        return selectCategories.findIndex(
            (selectedCategory) => selectedCategory.id === targetId
        ) !== -1
            ? true
            : false
    }

    const handleSubmit = async () => {
        try {
            await createCategoriesOnRoles.mutate(createCategoiresOnRoles())
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

    const createCategoiresOnRoles = () => {
        const categoriesOnRoles: CategoriesOnRoles = []
        selectCategories.forEach((category) => {
            categoriesOnRoles.push({
                categoryId: category.id,
                roleId: roleId,
            })
        })
        return categoriesOnRoles
    }

    return (
        <>
            <ToastContainer />
            <div className="bg-gray-200 rounded p-5">
                <div className="p-3">
                    <h2 className="text-lg bold">カテゴリー</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                    {categories.length !== 0 && selectCategories ? (
                        categories.map((category) => (
                            <div key={category.id} className="pl-3">
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
                                    className="ml-2"
                                >
                                    {category.name}
                                </label>
                            </div>
                        ))
                    ) : (
                        <div className="p-3">
                            カテゴリーが登録されていません。
                        </div>
                    )}
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

export default CategoriesContainer
