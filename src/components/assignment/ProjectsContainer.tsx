import React from 'react'
import { Project } from '@prisma/client'
import { useState, useEffect } from 'react'
import { ProjectAndRoleIds } from '../../types/index'
import Button from '@/components/common/Button'
import { DISPLAY_NOTICE_MILLISECOUND } from '../../consts/index'
import { ProjectsOnRoles } from '../../hooks/role/useCreateProjectsOnRole'
import { toast, ToastContainer } from 'react-toastify'
import { useCreateProjectsOnRoles } from '@/hooks/role/useCreateProjectsOnRole'

const ProjectsContainer: React.FC<{
    projects: ProjectAndRoleIds[]
    roleId: number
}> = ({ projects, roleId }) => {
    const [selectedProjects, setSelectedProjects] = useState<Project[]>()
    const createProjectsOnRoles = useCreateProjectsOnRoles()

    useEffect(() => {
        setSelectedProjects(extractRegisterdByRoleId(projects))
    }, [projects])

    const extractRegisterdByRoleId = (targetArray: ProjectAndRoleIds[]) => {
        const result = []
        targetArray.forEach((target) => {
            target.roles.forEach((role) => {
                if (role.roleId === roleId) {
                    result.push(target)
                }
            })
        })
        return result
    }

    const handleCheck = (targetId: number) => {
        if (existsById(targetId)) {
            setSelectedProjects(
                selectedProjects.filter(
                    (selectedProject) => selectedProject.id !== targetId
                )
            )
        } else {
            const checkedProjects = projects.find(
                (project) => project.id === targetId
            )
            setSelectedProjects([...selectedProjects, checkedProjects])
        }
    }

    const existsById = (targetId: number) => {
        return selectedProjects.findIndex(
            (selectedProject) => selectedProject.id === targetId
        ) !== -1
            ? true
            : false
    }

    const handleSubmit = async () => {
        try {
            const projectsOnRoles: ProjectsOnRoles = []
            selectedProjects.forEach((project) => {
                projectsOnRoles.push({
                    projectId: project.id,
                    roleId: roleId,
                })
            })
            await createProjectsOnRoles.mutate(projectsOnRoles)
            await toast.success('更新完了', {
                autoClose: DISPLAY_NOTICE_MILLISECOUND,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="bg-gray-200 rounded p-5">
                <div className="p-3">
                    <h2 className="text-lg bold">カテゴリー</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                    {projects &&
                        selectedProjects &&
                        projects.map((project) => (
                            <div key={project.id}>
                                <input
                                    checked={existsById(project.id)}
                                    onChange={(e) => {
                                        handleCheck(Number(e.target.value))
                                    }}
                                    id="checked-checkbox"
                                    type="checkbox"
                                    value={project.id}
                                    className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                                />
                                <label
                                    htmlFor="checked-checkbox"
                                    className="ml-2 text-sm font-medium"
                                >
                                    {project.name}
                                </label>
                            </div>
                        ))}
                </div>
                <div className="flex">
                    <Button
                        text="更新"
                        type="submit"
                        color="primary"
                        onClickEvent={handleSubmit}
                        className="ml-auto"
                    />
                </div>
            </div>
        </>
    )
}

export default ProjectsContainer
