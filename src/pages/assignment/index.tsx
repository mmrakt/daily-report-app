import Button from '@/components/common/Button'
import React from 'react'
import Layout from '../../components/layout/index'
import { useFetchRoles } from '@/hooks/role/useFetchRoles'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import TableContainer from '../../components/assignment/Table'

const Assignment: React.VFC = () => {
    const [selectedRoleId, setSelectedRoleId] = React.useState<string>()
    const [isDisplayed, setIsDisplayed] = React.useState<boolean>(false)
    const { data: roles, isLoading } = useFetchRoles()

    if (isLoading) return <LoadingSpinner />

    const handleChange = (selectedRoleId: string) => {
        setSelectedRoleId(selectedRoleId)
        setIsDisplayed(false)
    }
    const handleDisplay = () => {
        setIsDisplayed(true)
    }
    return (
        <Layout>
            <div className="bg-gray-200 rounded p-5">
                <label
                    htmlFor="roles"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                    Select an option
                </label>
                <select
                    id="countries"
                    onChange={(e) => {
                        handleChange(e.target.value)
                    }}
                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option selected>ロールを選択してください</option>
                    {roles &&
                        roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                </select>
                <div className="flex">
                    <Button
                        text="表示"
                        color="primary"
                        className="ml-auto"
                        onClickEvent={handleDisplay}
                    />
                </div>
            </div>
            <div className="mt-5">
                {isDisplayed && (
                    <TableContainer roleId={Number(selectedRoleId)} />
                )}
            </div>
        </Layout>
    )
}

export default Assignment
