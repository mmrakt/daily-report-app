import React, { useState } from 'react'
import {
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Paper,
} from '@material-ui/core'
import Item from './Item'
import { ToastContainer, toast } from 'react-toastify'
import styled from 'styled-components'
import { HOURS, DISPLAY_NOTICE_MILLISECOUND } from '../../consts/index'
import { uuidv4 } from '@firebase/util'
import { ITask } from '../../types/index'
import { Project, Task, Category } from '@prisma/client'
import { useCreateTasksByDate } from '@/hooks/task/useCreateTasksByDate'
import CloseIcon from '@/components/common/CloseIcon'
import Button from '@/components/common/Button'

const StyledTable = styled(Table)`
    minwidth: 650;
`

type IProps = {
    submittedTasks?: Task[]
    categories: Category[]
    projects: Project[]
    userId: number
    roleId: number
    selectDate: string
    onSubmit: () => void
}

const Form: React.FC<IProps> = ({
    submittedTasks,
    categories,
    projects,
    userId,
    roleId,
    selectDate,
    onSubmit,
}) => {
    const createInitialTask = React.useCallback(() => {
        return {
            tempId: uuidv4(),
            hours: HOURS[0],
            projectId: 1,
            categoryId: 1,
            summary: '',
            note: '',
            userId: userId,
            date: selectDate,
        }
    }, [userId, selectDate])

    const [editTasks, setEditTasks] = useState<ITask[]>()
    const createTasksMuatation = useCreateTasksByDate()

    React.useEffect(() => {
        if (submittedTasks.length) {
            setEditTasks(assignTempIdToTasks(submittedTasks))
        } else {
            setEditTasks([createInitialTask()])
        }
    }, [submittedTasks, createInitialTask])

    const handleAddTask = () => {
        setEditTasks([...editTasks, createInitialTask()])
    }

    const handleDeleteTask = (tempId: string) => {
        const newTasks = editTasks.filter((task) => task.tempId !== tempId)
        setEditTasks(newTasks)
    }
    const handleDeleteAllTasks = () => {
        setEditTasks([])
    }
    const handleUpdateTask = (
        tempId: string,
        label: string,
        value?: string | number
    ) => {
        const newTasks = editTasks.map((task) => {
            if (task.tempId === tempId) {
                if (typeof value === 'string') {
                    switch (label) {
                        case 'summary':
                            task.summary = value
                            break
                        case 'note':
                            task.note = value
                            break
                    }
                } else {
                    switch (label) {
                        case 'hours':
                            task.hours = value
                            break
                        case 'categoryId':
                            task.categoryId = value
                            break
                        case 'projectId':
                            task.projectId = value
                            break
                    }
                }
            }
            return task
        })
        setEditTasks(newTasks)
    }

    const handleSubmitTasks = React.useCallback(
        async (ev: React.FormEvent<HTMLFormElement>) => {
            try {
                ev.preventDefault()
                await createTasksMuatation.mutate(
                    removeTempIdByTasks(editTasks)
                )
                await toast.success('提出完了しました。お疲れ様でした。', {
                    autoClose: DISPLAY_NOTICE_MILLISECOUND,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setTimeout(() => {
                    onSubmit()
                }, DISPLAY_NOTICE_MILLISECOUND)
            } catch (err) {
                console.log(err)
            }
        },
        [createTasksMuatation, editTasks, onSubmit]
    )

    const assignTempIdToTasks = (submittedTasks: Task[]): ITask[] => {
        const assignedIdTasks = []
        for (let i = 0; i < submittedTasks.length; ++i) {
            const assignedIdTask = Object.assign({}, submittedTasks[i])
            assignedIdTasks.splice(i, 0, assignedIdTask)
            assignedIdTasks[i].tempId = uuidv4()
        }
        return assignedIdTasks
    }

    const removeTempIdByTasks = (tasks: ITask[]): ITask[] => {
        const tempTasks = tasks
        const returnTasks = []
        tempTasks.forEach((returnTask) => {
            delete returnTask.tempId
            returnTasks.push(returnTask)
        })
        return returnTasks
    }

    return (
        <div className="">
            <ToastContainer />
            <div className="">
                <Button
                    text="追加"
                    color="tertiary"
                    className=""
                    onClickEvent={handleAddTask}
                />
                <button
                    className="float-right"
                    onClick={() => {
                        onSubmit()
                    }}
                >
                    <CloseIcon className="text-gray-500 hover:text-gray-400" />
                </button>
            </div>
            <TableContainer component={Paper}>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">時間(h)</TableCell>
                            <TableCell align="center">カテゴリー</TableCell>
                            <TableCell align="center">プロジェクト</TableCell>
                            <TableCell align="center">作業概要</TableCell>
                            <TableCell align="center">備考</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {editTasks &&
                            editTasks.map((task) => (
                                <Item
                                    task={task}
                                    categories={categories}
                                    projects={projects}
                                    key={task.tempId}
                                    onChange={(label, inputValue) => {
                                        handleUpdateTask(
                                            task.tempId,
                                            label,
                                            inputValue
                                        )
                                    }}
                                    onDelete={() => {
                                        handleDeleteTask(task.tempId)
                                    }}
                                />
                            ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
            <div className="flex">
                <Button
                    text="一括削除"
                    color="secondary"
                    className=""
                    onClickEvent={handleDeleteAllTasks}
                />
                <form onSubmit={handleSubmitTasks}>
                    <Button
                        text="提出"
                        color="primary"
                        type="submit"
                        className=""
                        onClickEvent={handleSubmitTasks}
                    />
                </form>
            </div>
        </div>
    )
}
export default Form
