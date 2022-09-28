import { Category, Project } from '@prisma/client'
type ITask = {
    tempId?: string
    summary: string
    note: string
    projectId: number
    categoryId: number
    hours: number
    userId: number
    date: string
}

type RoleIds = {
    roles: {
        roleId: number
    }[]
}

type CategoryAndRoleIds = Category & RoleIds
type ProjectAndRoleIds = Project & RoleIds

type Classification = {
    id: number
    name: string
}

type EditTask = {
    tempId: string
    hours: string
    categoryId: string
    projectId: string
    summary: string
    note: string
}
