import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { HOURS, DISPLAY_NOTICE_MILLISECOUND } from '../../consts/index'
import { uuidv4 } from '@firebase/util'
import { EditTask } from '../../types/index'
import { Project, Task, Category } from '@prisma/client'
import { useCreateTasksByDate } from '@/hooks/task/useCreateTasksByDate'
import CloseIcon from '@/components/common/CloseIcon'
import Button from '@/components/common/Button'
import Row from './Row'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateTask } from '../../hooks/task/useCreateTasksByDate'

type IProps = {
    submittedTasks?: Task[]
    categories: Category[]
    projects: Project[]
    userId: number
    roleId: number
    selectDate: string
    onModalClose: () => void
}

type FormData = Record<string, Omit<EditTask, 'tempId'>>

const Form: React.FC<IProps> = ({
    submittedTasks,
    categories,
    projects,
    userId,
    selectDate,
    onModalClose,
}) => {
    const { register, handleSubmit, setValue, unregister } = useForm({})
    const createInitialTask = React.useCallback((): EditTask => {
        return {
            tempId: uuidv4(),
            hours: HOURS[0],
            projectId: '1',
            categoryId: '1',
            summary: '',
            note: '',
        }
    }, [])
    const [editTasks, setEditTasks] = useState<EditTask[]>()
    const createTasksMuatation = useCreateTasksByDate()

    React.useEffect(() => {
        if (submittedTasks?.length) {
            const replacedTasks = replaceToTempIdOfTasks(submittedTasks)
            setEditTasks(replacedTasks)
            replacedTasks.forEach((task) => {
                setValue(`tasks.${task.tempId}`, task)
            })
        } else {
            handleAdd()
        }
    }, [submittedTasks, createInitialTask])

    const handleAdd = () => {
        const newTask = createInitialTask()
        if (editTasks?.length) {
            setEditTasks([...editTasks, newTask])
        } else {
            setEditTasks([newTask])
        }
        setValue(`task.${newTask.tempId}`, newTask)
    }

    const handleRemove = (tempId: string) => {
        const filteredTasks = editTasks.filter((task) => task.tempId !== tempId)
        setEditTasks(filteredTasks)
        unregister(`tasks.${tempId}`)
    }
    const handleDeleteAllTasks = () => {
        setEditTasks([])
        unregister('tasks')
    }

    const onSubmit: SubmitHandler<{
        tasks: FormData
    }> = async ({ tasks }) => {
        try {
            await createTasksMuatation.mutate(createTasksMutationParams(tasks))
            await toast.success('提出完了しました。お疲れ様でした。', {
                autoClose: DISPLAY_NOTICE_MILLISECOUND,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setTimeout(() => {
                onModalClose()
            }, DISPLAY_NOTICE_MILLISECOUND)
        } catch (err) {
            console.log(err)
        }
    }

    const createTasksMutationParams = (tasks: FormData) => {
        const param: CreateTask[] = []
        for (const [index, task] of Object.entries(tasks)) {
            param.push({
                categoryId: Number(task.categoryId),
                projectId: Number(task.projectId),
                hours: Number(task.hours),
                summary: task.summary,
                note: task.note,
                date: selectDate,
                userId: userId,
            })
        }
        return param
    }

    const replaceToTempIdOfTasks = (submittedTasks: Task[]): EditTask[] => {
        const assignedTempIdTasks = []
        for (let i = 0; i < submittedTasks.length; ++i) {
            const copyTask = Object.assign({}, submittedTasks[i])
            assignedTempIdTasks.splice(i, 0, copyTask)
            assignedTempIdTasks[i].tempId = uuidv4()
            delete assignedTempIdTasks[i].id
        }
        return assignedTempIdTasks
    }

    return (
        <div className="">
            <ToastContainer />
            <div className="">
                <Button
                    text="タスク追加"
                    color="tertiary"
                    className=""
                    onClickEvent={handleAdd}
                />
                <button
                    className="float-right"
                    onClick={() => {
                        onModalClose()
                    }}
                >
                    <CloseIcon className="text-gray-500 hover:text-gray-400" />
                </button>
            </div>
            <table className="table-fixed bg-gray-200 rounded">
                <thead className="bg-gray-300 rounded text-base font-normal px-3">
                    <tr>
                        <th className="py-3 px-6">時間(h)</th>
                        <th className="py-3 px-6">カテゴリー</th>
                        <th className="py-3 px-6">プロジェクト</th>
                        <th className="py-3 px-6">作業概要</th>
                        <th className="py-3 px-6">備考</th>
                        <th className="py-3 px-6"></th>
                    </tr>
                </thead>
                <tbody>
                    {editTasks &&
                        editTasks.map((task) => (
                            <Row
                                task={task}
                                categories={categories}
                                projects={projects}
                                key={task.tempId}
                                onDelete={() => {
                                    handleRemove(task.tempId)
                                }}
                                register={register}
                            />
                        ))}
                </tbody>
            </table>
            <div className="flex">
                <Button
                    text="一括削除"
                    color="secondary"
                    type="button"
                    className=""
                    onClickEvent={handleDeleteAllTasks}
                />
                <Button
                    text="提出"
                    color="primary"
                    type="submit"
                    className=""
                    onClickEvent={handleSubmit(onSubmit)}
                />
            </div>
        </div>
    )
}
export default Form
