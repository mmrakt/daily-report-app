import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import {
    Checkbox,
    TextField,
    TableCell,
    Select,
    MenuItem,
    TableRow,
} from '@material-ui/core'
import { Const } from '../../utils/const'

type Props = {
    task: {
        id: string
        target: boolean
        hourId: number
        categoryId: number
        project: string
        ticketTitle: string
        note: string
    }
    hourList: { id: number; hour: number }[]
    categoryList: { id: number; category: string }[]
    onDelete: () => void
    onChange: (label: string, value: string | number) => void
}
const TaskItem = (props: Props): React.ReactElement => {
    const { task, hourList, categoryList, onDelete, onChange } = props

    // NOTE: inputとselect両方から受け取るためanyを指定
    const handleChange = (e: React.ChangeEvent<any>, label: string) => {
        onChange(label, e.target.value)
    }
    return (
        <TableRow>
            <TableCell component="th" scope="row" align="center">
                <Checkbox
                    id="target"
                    onChange={(e) => {
                        handleChange(e, 'target')
                    }}
                    value={task.target}
                />
            </TableCell>
            <TableCell align="center">
                <Select
                    id="hourId"
                    onChange={(e) => {
                        handleChange(e, 'hourId')
                    }}
                    fullWidth
                    value={task.hourId}
                >
                    {hourList.map((hour, index) => (
                        <MenuItem value={index} key={index}>
                            {hour.hour}h
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
            <TableCell align="center">
                <Select
                    id="categoryId"
                    onChange={(e) => {
                        handleChange(e, 'categoryId')
                    }}
                    fullWidth
                    value={task.categoryId}
                >
                    {categoryList.map((category, index) => (
                        <MenuItem value={index} key={index}>
                            {category.category}
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
            <TableCell align="center">
                <Select
                    id="project"
                    onChange={(e) => {
                        handleChange(e, 'project')
                    }}
                    fullWidth
                    value={task.project}
                >
                    {Const.PROJECT_LIST.map((project, index) => (
                        <MenuItem value={project} key={index}>
                            {project}
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
            <TableCell align="center">
                <TextField
                    id="ticketTitle"
                    onChange={(e) => {
                        handleChange(e, 'ticketTitle')
                    }}
                    value={task.ticketTitle || ''}
                    fullWidth
                />
            </TableCell>
            <TableCell align="center">
                <TextField
                    id="note"
                    onChange={(e) => {
                        handleChange(e, 'note')
                    }}
                    value={task.note || ''}
                    fullWidth
                />
            </TableCell>
            <TableCell align="center">
                <DeleteIcon onClick={onDelete} data-testid="delete-icon" />
            </TableCell>
        </TableRow>
    )
}
export default TaskItem
