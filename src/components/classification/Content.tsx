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
    updateMutation?: UseMutationResult<
        Response,
        unknown,
        Role[] | Classification[],
        unknown
    >
    disableMutation?: UseMutationResult<Response, unknown, number[], unknown>
}> = ({ classifications, label, updateMutation, disableMutation }) => {
    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        criteriaMode: 'all',
        mode: 'onChange',
    })
    const [editClassifications, setEditClassifications] = useState<
        { id: string; name: string }[]
    >([])
    const TEXT_FORM_REGISTER_PREVIX = 'classifications.text.id.'
    const CHECKBOX_REGISTER_PREVIX = 'classifications.checkbox.id.'
    const validationRules = {
        required: true,
        maxLength: 30,
    }

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
            await disableMutation.mutate(
                createDeleteMutateParam(classifications.checkbox.id)
            )
            toast.success('アーカイブ完了', {
                autoClose: DISPLAY_NOTICE_MILLISECOUND,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (error) {
            console.error(error)
            toast.success('アーカイブに失敗しました', {
                autoClose: DISPLAY_NOTICE_MILLISECOUND,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
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

    // console.log(errors.classifications?.text.id[1])

    return (
        <>
            <ToastContainer />
            <div className="bg-gray-200 rounded p-5">
                <div className="flex ">
                    <h2 className="text-lg bold">{label}</h2>
                    <Button
                        text={`チェック済みの${label}をアーカイブ`}
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
                        {classifications &&
                            classifications.map((classification) => (
                                <>
                                    <div
                                        key={classification.id}
                                        className="grid grid-template-classification-setting-form mt-3 gap-3 justify-start items-center"
                                    >
                                        <div className="flex justify-center items-center">
                                            <input
                                                type="checkbox"
                                                {...register(
                                                    CHECKBOX_REGISTER_PREVIX +
                                                        classification.id
                                                )}
                                                className="rounded"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            {...register(
                                                TEXT_FORM_REGISTER_PREVIX +
                                                    classification.id,
                                                {
                                                    required: true,
                                                    maxLength: 30,
                                                }
                                            )}
                                            className="rounded"
                                        />
                                        <span className="text-red-700 font-light">
                                            {errors.classifications?.text.id[
                                                classification.id
                                            ]?.type === 'required' &&
                                                '必須項目です'}
                                            {errors.classifications?.text.id[
                                                classification.id
                                            ]?.type === 'maxLength' &&
                                                '20文字以上は入力できません'}
                                        </span>
                                    </div>
                                </>
                            ))}
                        {editClassifications &&
                            editClassifications.map((classification) => (
                                <div
                                    key={classification.id}
                                    className="grid grid-template-classification-setting-form mt-3 gap-3 justify-start items-center"
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleRemove(classification.id)
                                        }}
                                        className="flex justify-center items-center"
                                    >
                                        <MinusCircle className="text-red-500" />
                                    </button>
                                    <input
                                        type="text"
                                        {...register(
                                            TEXT_FORM_REGISTER_PREVIX +
                                                classification.id,
                                            { required: true, maxLength: 30 }
                                        )}
                                        className="rounded"
                                    />
                                    <span className="text-red-700 font-light">
                                        {errors.classifications?.text.id[
                                            classification.id
                                        ]?.type === 'maxLength' &&
                                            '20文字以上は入力できません'}
                                    </span>
                                </div>
                            ))}
                        {/* </div> */}
                        <div className="flex mt-3">
                            <Button
                                text="一括登録"
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
