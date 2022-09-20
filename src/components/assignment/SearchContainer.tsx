import Button from '@/components/common/Button'
import React, { useState } from 'react'
import { useFetchRoles } from '@/hooks/role/useFetchRoles'
import LoadingSpinner from '../../components/common/LoadingSpinner'

type IProps = {
    onChange: (value: string) => void
    onDisplay: () => void
}
const SearchContainer: React.FC<IProps> = ({ onChange, onDisplay }) => {
    const { data: roles, isLoading } = useFetchRoles()
    const [isChangedOption, setIsChangedOption] = useState<boolean>(false)

    if (isLoading) return <LoadingSpinner />

    return (
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
                    setIsChangedOption(true)
                    onChange(e.target.value)
                }}
                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
                <option selected disabled>
                    ロールを選択してください
                </option>
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
                    onClickEvent={onDisplay}
                    disabled={!isChangedOption ? true : false}
                />
            </div>
        </div>
    )
}

export default SearchContainer
