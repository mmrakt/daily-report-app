import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
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
import Layout from '../../components/layout'
import TaskItem from './TaskItem'
import {
    usePostReportMutation,
    usePostTaskMutation,
    useGetReportQuery,
} from '../../generated/graphql'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import styled from 'styled-components'

const StyledTable = styled(Table)`
    minwidth: 650;
`
const StyledButtons = styled.div`
    display: flex;
`
const StyledButton = styled(Button)`
    justify-content: flex-end;
`

const Submit = (): React.ReactElement => {
    const router = useRouter()
    const reportDate = router.query
    const [postTask] = usePostTaskMutation()
    const [postReport] = usePostReportMutation()
    const [tasks, setTasks] = useState([])
    const [hourList, setHourList] = useState([])
    const [categoryList, setCategoryList] = useState([])

    const { data } = useGetReportQuery({
        variables: {
            dateText: reportDate.date as string,
        },
    })
    React.useEffect(() => {
        if (data) {
            if (data.reports.length) {
                const submittedTasks = [...data.reports[0].tasks]
                setTasks(submittedTasks)
            } else {
                setTasks([
                    {
                        id: uuidv4(),
                        target: false,
                        hourId: 1,
                        project: '',
                        ticketTitle: '',
                        note: '',
                    },
                ])
            }
            setHourList(data.hours)
            setCategoryList(data.categories)
        }
    }, [data])

    const handleAddTask = () => {
        setTasks([
            ...tasks,
            {
                id: uuidv4(),
                target: false,
                hourId: 1,
                categoryId: 1,
                project: '',
                ticketTitle: '',
                note: '',
            },
        ])
    }

    const handleDeleteTask = (id) => {
        const newTasks = tasks.filter((row) => row.id !== id)
        setTasks(newTasks)
    }
    const handleDeleteAllTasks = () => {
        setTasks([])
    }
    const handleUpdateTask = (
        id: number,
        label: string,
        value?: string | number
    ) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                switch (label) {
                    case 'target':
                        task.target = !task.target
                        break
                    case 'hourId':
                        task.hourId = value
                        break
                    case 'categoryId':
                        task.categoryId = value
                        break
                    case 'project':
                        task.project = value
                        break
                    case 'ticketTitle':
                        task.ticketTitle = value
                        break
                    case 'note':
                        task.note = value
                        break
                }
            }
            return task
        })
        setTasks(newTasks)
    }

    const handleSubmitTasks = React.useCallback(
        async (ev: React.FormEvent<HTMLFormElement>) => {
            try {
                ev.preventDefault()

                await postReport({
                    variables: {
                        dateText: reportDate.date as string,
                        createdAt: 'now()',
                        updatedAt: null,
                    },
                })
                tasks.forEach(async (task) => {
                    await postTask({
                        variables: {
                            target: task.target,
                            reportDateText: reportDate.date as string,
                            hourId: task.hourId,
                            categoryId: task.categoryId,
                            project: task.project,
                            ticketTitle: task.ticketTitle,
                            note: task.note,
                        },
                    })
                })
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
        [tasks, postReport, postTask]
    )

    return (
        <Layout title="提出フォーム">
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
                            <TableCell align="center">目標</TableCell>
                            <TableCell align="center">時間(h)</TableCell>
                            <TableCell align="center">カテゴリー</TableCell>
                            <TableCell align="center">プロジェクト</TableCell>
                            <TableCell align="center">作業概要</TableCell>
                            <TableCell align="center">備考</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TaskItem
                                task={task}
                                hourList={hourList}
                                categoryList={categoryList}
                                key={task.id}
                                onChange={(label, inputValue) => {
                                    handleUpdateTask(task.id, label, inputValue)
                                }}
                                onDelete={() => {
                                    handleDeleteTask(task.id)
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
        </Layout>
    )
}
export default Submit
