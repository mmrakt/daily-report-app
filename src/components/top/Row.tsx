import React from 'react'
import { Project, Category } from '@prisma/client'
import { HOURS } from '../../consts/index'
import { ITask } from '../../types/index'
import MinusCircle from '../common/MinusCircle'

type IProps = {
    task: ITask
    categories: Category[]
    projects: Project[]
    onDelete: () => void
    onChange: (label: string, value: string | number) => void
}

const Row: React.FC<IProps> = ({
    task,
    categories,
    projects,
    onDelete,
    onChange,
}) => {
    // NOTE: inputとselect両方から受け取るためanyを指定
    const handleChange = (e: React.ChangeEvent<any>, label: string) => {
        onChange(label, e.target.value)
    }
    return (
        <tr className="border-b border-gray-100">
            <td className="py-2 px-3">
                <select
                    name="hourId"
                    className="rounded text-base border-none"
                    onChange={(e) => {
                        handleChange(e, 'hourId')
                    }}
                    value={task.hours !== undefined ? task.hours : 0.25}
                >
                    {HOURS.map((hour, index) => (
                        <option value={hour} key={index}>
                            {hour}h
                        </option>
                    ))}
                </select>
            </td>
            <td className="py-2 px-3">
                <select
                    name="categoryId"
                    className="rounded text-base border-none"
                    onChange={(e) => {
                        handleChange(e, 'categoryId')
                    }}
                    value={task.categoryId !== undefined ? task.categoryId : 1}
                >
                    {categories.map((category, index) => (
                        <option value={category.id} key={index}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </td>
            <td className="py-2 px-3">
                <select
                    name="projectId"
                    className="rounded text-base border-none"
                    onChange={(e) => {
                        handleChange(e, 'projectId')
                    }}
                    value={task.projectId !== undefined ? task.projectId : 1}
                >
                    {projects.map((project, index) => (
                        <option value={project.id} key={index}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </td>
            <td className="py-2 px-3">
                <input
                    type="text"
                    name="summary"
                    className="rounded p-2.5 text-md"
                    onChange={(e) => {
                        handleChange(e, 'summary')
                    }}
                    value={task.summary || ''}
                />
            </td>
            <td className="py-2 px-3">
                <input
                    type="text"
                    name="note"
                    className="rounded p-2.5 text-md"
                    onChange={(e) => {
                        handleChange(e, 'note')
                    }}
                    value={task.note || ''}
                />
            </td>
            <td className="py-2 px-3">
                <button
                    type="button"
                    onClick={onDelete}
                    className="flex justify-center items-center"
                >
                    <MinusCircle className="text-red-500" />
                </button>
            </td>
        </tr>
    )
}
export default Row
