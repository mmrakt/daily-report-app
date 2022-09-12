import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import { Project, Category } from '@prisma/client'
import { HOURS } from '../consts/index'
import { ITask } from '../types/index'
import {
    Checkbox,
    TextField,
    TableCell,
    Select,
    MenuItem,
    TableRow,
} from '@material-ui/core'

type IProps = {
    task: ITask
    categories: Category[]
    projects: Project[]
    onDelete: () => void
    onChange: (label: string, value: string | number) => void
}

const Item: React.FC<IProps> = ({
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
        <TableRow>
            <TableCell align="center">
                <Select
                    id="hourId"
                    onChange={(e) => {
                        handleChange(e, 'hourId')
                    }}
                    fullWidth
                    value={task.hours !== undefined ? task.hours : 0.25}
                >
                    {HOURS.map((hour, index) => (
                        <MenuItem value={hour} key={index}>
                            {hour}h
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
                    value={task.categoryId !== undefined ? task.categoryId : 1}
                >
                    {categories.map((category, index) => (
                        <MenuItem value={category.id} key={index}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
            <TableCell align="center">
                <Select
                    id="projectId"
                    onChange={(e) => {
                        handleChange(e, 'projectId')
                    }}
                    fullWidth
                    value={task.projectId !== undefined ? task.projectId : 1}
                >
                    {projects.map((project, index) => (
                        <MenuItem value={project.id} key={index}>
                            {project.name}
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
            <TableCell align="center">
                <TextField
                    id="summary"
                    onChange={(e) => {
                        handleChange(e, 'summary')
                    }}
                    value={task.summary || ''}
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
export default Item
