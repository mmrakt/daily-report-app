import React, { useState } from 'react'
import {
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Paper,
    Button,
} from '@material-ui/core'
import Item from './Item'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import styled from 'styled-components'
import { useFetchTasksByDate } from '@/hooks/task/useFetchTasksByDate'
import LoadingSpinner from './common/LoadingSpinner'
import { useFetchCategories } from '@/hooks/category/useFetchCategories'
import { useFetchProjects } from '@/hooks/project/useFetchProjects'
import { HOURS } from '../consts/index'
import { uuidv4 } from '@firebase/util'
import { ITask } from '../types/index'
import { Project, Task, Category } from '@prisma/client'

const StyledTable = styled(Table)`
    minwidth: 650;
`
const StyledButtons = styled.div`
    display: flex;
`
const StyledButton = styled(Button)`
    justify-content: flex-end;
`

type IProps = {
    selectDate: string
}

const FormContainer: React.FC<IProps> = ({ selectDate }) => {
    // FIXME:
    const userId = 1
    const roleId = 1
    const { data: submittedTasks, isLoading: isLoadingFetchTasks } =
        useFetchTasksByDate(userId, selectDate)

    const { data: categories, isLoading: isLoadingFeatchCategories } =
        useFetchCategories(roleId)
    const { data: projects, isLoading: isLoadingFeatchProjects } =
        useFetchProjects(roleId)

    if (
        isLoadingFetchTasks ||
        isLoadingFeatchCategories ||
        isLoadingFeatchProjects
    )
        return <LoadingSpinner />

    return (
        <Form
            submittedTasks={submittedTasks}
            categories={categories}
            projects={projects}
            userId={userId}
            roleId={roleId}
            selectDate={selectDate}
        />
    )
}

type IProps2 = {
    submittedTasks: Task[]
    categories: Category[]
    projects: Project[]
    userId: number
    roleId: number
    selectDate: string
}

const Form: React.FC<IProps2> = ({
    submittedTasks,
    categories,
    projects,
    userId,
    roleId,
    selectDate,
}) => {
    const createInitialTask = () => {
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
    }
    const [editTasks, setEditTasks] = useState<ITask[]>([createInitialTask()])

    React.useEffect(() => {
        if (submittedTasks) {
            const assignedIdTasks = []
            for (let i = 0; i < submittedTasks.length; ++i) {
                const assignedIdTask = Object.assign({}, submittedTasks[i])
                assignedIdTasks.splice(i, 0, assignedIdTask)
                assignedIdTasks[i].tempId = uuidv4()
            }
            setEditTasks(assignedIdTasks)
        }
    }, [submittedTasks])

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

                // await postReport({
                //     variables: {
                //         dateText: reportDate.date as "String",
                //         createdAt: 'now()',
                //         updatedAt: null,
                //     },
                // })
                // tasks.forEach(async (task) => {
                //     await postTask({
                //         variables: {
                //             target: task.target,
                //             reportDateText: reportDate.date as string,
                //             hourId: task.hourId,
                //             categoryId: task.categoryId,
                //             project: task.project,
                //             summary: task.summary,
                //             note: task.note,
                //         },
                //     })
                // })
                await toast.success('提出完了しました。お疲れ様でした。', {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } catch (err) {
                console.log(err)
            }
        },
        []
    )

    return (
        <div className="">
            <ToastContainer />
            <StyledButton
                variant="contained"
                onClick={handleAddTask}
                data-testid="add-button"
            >
                作業を追加
            </StyledButton>
            <TableContainer component={Paper}>
                <StyledTable aria-label="simple table">
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
                        {editTasks.map((task) => (
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
            <StyledButtons>
                <StyledButton
                    variant="contained"
                    color="secondary"
                    disableElevation
                    onClick={handleDeleteAllTasks}
                    data-testid="delete-button"
                >
                    一括削除
                </StyledButton>
                <form onSubmit={handleSubmitTasks}>
                    <StyledButton
                        variant="contained"
                        color="primary"
                        disableElevation
                        type="submit"
                    >
                        提出する
                    </StyledButton>
                </form>
            </StyledButtons>
        </div>
    )
}
export default FormContainer
