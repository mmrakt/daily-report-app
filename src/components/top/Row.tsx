import React from 'react'
import { Project, Category } from '@prisma/client'
import { HOURS } from '../../consts/index'
import { EditTask } from '../../types/index'
import MinusCircle from '../common/icon/MinusCircle'
import { FieldValue, UseFormRegister } from 'react-hook-form'

type IProps = {
    task: EditTask
    categories: Category[]
    projects: Project[]
    onDelete: () => void
    register: UseFormRegister<FieldValue>
}

const Row: React.FC<IProps> = ({
    task,
    categories,
    projects,
    onDelete,
    register,
}) => {
    return (
        <tr className="border-b border-gray-100">
            <td className="py-2 px-3">
                <select
                    name="hours"
                    className="rounded text-base border-none"
                    {...register(`tasks.${task.tempId}.hours`)}
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
                    name="category"
                    className="rounded text-base border-none"
                    {...register(`tasks.${task.tempId}.categoryId`)}
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
                    name="project"
                    className="rounded text-base border-none"
                    {...register(`tasks.${task.tempId}.projectId`)}
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
                    {...register(`tasks.${task.tempId}.summary`)}
                />
            </td>
            <td className="py-2 px-3">
                <input
                    type="text"
                    name="note"
                    className="rounded p-2.5 text-md"
                    {...register(`tasks.${task.tempId}.note`)}
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
