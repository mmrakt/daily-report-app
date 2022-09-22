import { Category, Project } from '@prisma/client'
export type ITask = {
    tempId?: string
    summary: string
    note: string
    projectId: number
    categoryId: number
    hours: number
    userId: number
    date: string
}

export type RoleIds = {
    roles: {
        roleId: number
    }[]
}

export type CategoryAndRoleIds = Category & RoleIds
export type ProjectAndRoleIds = Project & RoleIds

export type Classification = {
    id: number
    name: string
}
