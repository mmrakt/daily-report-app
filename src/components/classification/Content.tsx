import React from 'react'
import { Role, Category, Project } from '@prisma/client'
import { ToastContainer, toast } from 'react-toastify'
import Button from '@/components/common/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { UseMutationResult } from 'react-query'
import { DISPLAY_NOTICE_MILLISECOUND } from '../../consts/index'
import { Classification } from '../../types/index'
import { uuidv4 } from '@firebase/util'
import MinusCircle from '../common/MinusCircle'

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
    const [editClassifications, setEditClassifications] = useState<
        { id: string; name: string }[]
    >([])

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

    const handleAdd = () => {
        const uuid = uuidv4()
        setEditClassifications([
            ...editClassifications,
            {
                id: uuid,
                name: '',
            },
        ])
        setValue('classificatin.id' + uuid, '')
    }

    const handleRemove = (id: string) => {
        const filteredClassifications = editClassifications.filter(
            (classification) => classification.id !== id
        )
        setEditClassifications(filteredClassifications)
    }

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
                <div className="flex ">
                    <h2 className="text-lg bold">{label}</h2>
                    <Button
                        text="追加"
                        type="button"
                        color="secondary"
                        className="ml-auto"
                        onClickEvent={handleAdd}
                    />
                </div>
                <div className="class">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ul className="">
                            {classifications &&
                                classifications.map((classification) => (
                                    <li
                                        key={classification.id}
                                        className="mt-3"
                                    >
                                        <input
                                            type="text"
                                            // key={classification.id}
                                            {...register(
                                                `classifications.id${classification.id}`
                                            )}
                                            className="rounded w-4/5"
                                        />
                                    </li>
                                ))}
                            {editClassifications &&
                                editClassifications.map((classification) => (
                                    <li
                                        key={classification.id}
                                        className="mt-3 flex items-center"
                                    >
                                        <input
                                            type="text"
                                            // key={classification.id}
                                            {...register(
                                                `classifications.id${classification.id}`
                                            )}
                                            className="rounded w-4/5"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                handleRemove(classification.id)
                                            }}
                                        >
                                            <MinusCircle className="text-red-500" />
                                        </button>
                                    </li>
                                ))}
                        </ul>
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
