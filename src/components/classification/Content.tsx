import React from 'react'
import { Role, Category, Project } from '@prisma/client'
import { ToastContainer, toast } from 'react-toastify'
import Button from '@/components/common/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { UseMutationResult } from 'react-query'
import { DISPLAY_NOTICE_MILLISECOUND } from '../../consts/index'
import { Classification } from '../../types/index'

const Content: React.FC<{
    classifications: Role[] | Category[] | Project[]
    label: string
    mutation: UseMutationResult<
        Response,
        unknown,
        Role[] | Classification[],
        unknown
    >
}> = ({ classifications, label, mutation }) => {
    const { register, handleSubmit, formState, setValue } = useForm({
        criteriaMode: 'all',
        mode: 'onChange',
    })

    useEffect(() => {
        if (classifications.length) {
            classifications.forEach((classification) => {
                setValue(
                    `classifications.id${classification.id}`,
                    classification.name
                )
            })
        }
    }, [classifications])

    const onSubmit: SubmitHandler<{
        classifications: Record<string, string>
    }> = async ({ classifications }) => {
        const mutateParam = createMutateParam(classifications)
        try {
            await mutation.mutate(mutateParam)
            await toast.success('更新完了', {
                autoClose: DISPLAY_NOTICE_MILLISECOUND,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const createMutateParam = (values: Record<string, string>) => {
        const param: Classification[] = []
        for (const [index, value] of Object.entries(values)) {
            param.push({
                id: Number(index.slice(2)),
                name: value,
            })
        }
        return param
    }

    return (
        <>
            <ToastContainer />
            <div className="bg-gray-200 rounded p-5">
                <div className="p-3">
                    <h2 className="text-lg bold">{label}</h2>
                </div>
                <div className="class">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-4">
                            {classifications &&
                                classifications.map((classification) => (
                                    // <div
                                    //     className="grid grid-cols-2 gap-4"
                                    //     key={classification.id}
                                    // >
                                    <input
                                        type="text"
                                        key={classification.id}
                                        // name={`classification${classification.id}`}
                                        {...register(
                                            `classifications.id${classification.id}`
                                        )}
                                        className="rounded"
                                    />
                                    // </div>
                                ))}
                        </div>
                        <div className="flex mt-3">
                            <Button
                                text="全件更新"
                                type="submit"
                                color="primary"
                                className="ml-auto"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Content
