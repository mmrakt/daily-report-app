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

type FormData = {
    checkbox: {
        id: Record<string | number, string>
    }
    text: {
        id: Record<string | number, string>
    }
}
const Content: React.FC<{
    classifications: Role[] | Category[] | Project[]
    label: string
    updateMutation: UseMutationResult<
        Response,
        unknown,
        Role[] | Classification[],
        unknown
    >
    deleteMutation: UseMutationResult<Response, unknown, number[], unknown>
}> = ({ classifications, label, updateMutation, deleteMutation }) => {
    const { register, unregister, handleSubmit, formState, setValue } = useForm(
        {
            criteriaMode: 'all',
            mode: 'onChange',
        }
    )
    const [editClassifications, setEditClassifications] = useState<
        { id: string; name: string }[]
    >([])
    const TEXT_FORM_REGISTER_PREVIX = 'classifications.text.id.'
    const CHECKBOX_REGISTER_PREVIX = 'classifications.checkbox.id.'

    useEffect(() => {
        if (classifications.length) {
            classifications.forEach((classification) => {
                setValue(
                    TEXT_FORM_REGISTER_PREVIX + classification.id,
                    classification.name
                )
            })
        }
        // NOTE: mutate実行後のクリーンアップ
        if (editClassifications.length) {
            editClassifications.forEach((classification) => {
                unregister(TEXT_FORM_REGISTER_PREVIX + classification.id)
            })
            setEditClassifications([])
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
        setValue(TEXT_FORM_REGISTER_PREVIX + uuid, '')
    }

    const handleRemove = (id: string) => {
        const filteredClassifications = editClassifications.filter(
            (classification) => classification.id !== id
        )
        setEditClassifications(filteredClassifications)
        unregister(TEXT_FORM_REGISTER_PREVIX + id)
    }

    const onSubmit: SubmitHandler<{
        classifications: FormData
    }> = async ({ classifications }) => {
        const mutateParam = createUpdateMutateParam(classifications.text.id)
        try {
            await updateMutation.mutate(mutateParam)
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

    const handleDeleteByChecked: SubmitHandler<{
        classifications: FormData
    }> = async ({ classifications }) => {
        try {
            await deleteMutation.mutate(
                createDeleteMutateParam(classifications.checkbox.id)
            )
            await toast.success('削除完了', {
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

    const createDeleteMutateParam = (values: FormData['checkbox']['id']) => {
        const param: number[] = []
        for (const [index, value] of Object.entries(values)) {
            if (value) {
                param.push(Number(index))
            }
        }
        return param
    }

    const createUpdateMutateParam = (values: FormData['text']['id']) => {
        const param: Classification[] = []
        for (const [index, value] of Object.entries(values)) {
            param.push({
                id: Number(index) ? Number(index) : 0,
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
                        text={`チェック済みの${label}を全削除`}
                        type="submit"
                        color="secondary"
                        className="ml-auto"
                        onClickEvent={handleSubmit(handleDeleteByChecked)}
                    />
                    <Button
                        text="追加"
                        type="button"
                        color="tertiary"
                        className="ml-3"
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
                                            type="checkbox"
                                            {...register(
                                                CHECKBOX_REGISTER_PREVIX +
                                                    classification.id
                                            )}
                                        />
                                        <input
                                            type="text"
                                            {...register(
                                                TEXT_FORM_REGISTER_PREVIX +
                                                    classification.id
                                            )}
                                            className="rounded w-4/5 ml-3"
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
                                            {...register(
                                                TEXT_FORM_REGISTER_PREVIX +
                                                    classification.id
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
