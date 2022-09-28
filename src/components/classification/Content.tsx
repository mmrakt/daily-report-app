import React from 'react'
import { Role, Category, Project } from '@prisma/client'
import { ToastContainer, toast } from 'react-toastify'
import Button from '@/components/common/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { UseMutationResult } from 'react-query'
import {
    DISPLAY_NOTICE_MILLISECOUND,
    TEXT_FORM_REGISTER_PREFIX,
    CHECKBOX_REGISTER_PREFIX,
} from '../../consts/index'
import { Classification } from '../../types/index'
import { uuidv4 } from '@firebase/util'
import MinusCircle from '../common/icon/MinusCircle'
import Modal from 'react-modal'

const modalStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        maxWidth: '600px',
        maxHeight: '200px',
        margin: '0 auto',
        position: 'absolute',
        top: '10rem',
        left: '20rem',
        right: '20rem',
        bottom: '10rem',
        backgroundColor: 'white',
        padding: '2rem',
    },
}

type FormData = {
    checkbox: {
        id: Record<string | number, string>
    }
    text: {
        id: Record<string | number, string>
    }
}
type ModalType = 'updateConfirm' | 'disableConfirm' | ''

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
        formState: { errors, dirtyFields },
        setValue,
    } = useForm({
        criteriaMode: 'all',
        mode: 'onChange',
    })
    const [editClassifications, setEditClassifications] = useState<
        { id: string; name: string }[]
    >([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [selectedModalType, setSelectedModalType] = useState<ModalType>('')

    useEffect(() => {
        if (classifications.length) {
            classifications.forEach((classification) => {
                setValue(
                    TEXT_FORM_REGISTER_PREFIX + classification.id,
                    classification.name
                )
            })
        }
        // NOTE: mutate実行後のクリーンアップ
        if (editClassifications.length) {
            editClassifications.forEach((classification) => {
                unregister(TEXT_FORM_REGISTER_PREFIX + classification.id)
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
        setValue(TEXT_FORM_REGISTER_PREFIX + uuid, '')
    }

    const handleRemove = (id: string) => {
        const filteredClassifications = editClassifications.filter(
            (classification) => classification.id !== id
        )
        setEditClassifications(filteredClassifications)
        unregister(TEXT_FORM_REGISTER_PREFIX + id)
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
                createDisableMutateParam(classifications.checkbox.id)
            )
            await toast.success('アーカイブ完了', {
                autoClose: DISPLAY_NOTICE_MILLISECOUND,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            handleClose()
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

    const createDisableMutateParam = (values: FormData['checkbox']['id']) => {
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

    const handleOpen = (modalType: ModalType) => {
        setSelectedModalType(modalType)
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
        setSelectedModalType('')
    }

    const ConfirmModalContent = () => {
        if (selectedModalType === 'disableConfirm') {
            return (
                <>
                    <p className="font-medium text-base">
                        チェックを入れた{label}をアーカイブします。
                        <br />
                        よろしいですか？
                    </p>
                    <div className="flex mt-7">
                        <Button
                            text="キャンセル"
                            type="submit"
                            color="tertiary"
                            className="ml-auto"
                            onClickEvent={() => {
                                handleClose()
                            }}
                        />
                        <Button
                            text="アーカイブする"
                            type="submit"
                            color="secondary"
                            className="ml-3"
                            onClickEvent={handleSubmit(handleDeleteByChecked)}
                        />
                    </div>
                </>
            )
        } else if (selectedModalType === 'updateConfirm') {
            return (
                <>
                    <p className="font-medium text-base">
                        {label}を全件更新します。
                        <br />
                        よろしいですか？
                    </p>
                    <div className="flex mt-7">
                        <Button
                            text="キャンセル"
                            type="submit"
                            color="tertiary"
                            className="ml-auto"
                            onClickEvent={() => {
                                handleClose()
                            }}
                        />
                        <Button
                            text="更新する"
                            type="submit"
                            color="primary"
                            className="ml-3"
                            onClickEvent={handleSubmit(onSubmit)}
                        />
                    </div>
                </>
            )
        } else {
            return null
        }
    }

    return (
        <>
            <ToastContainer />
            <Modal
                isOpen={isOpen}
                style={modalStyle}
                onRequestClose={() => {
                    setIsOpen(false)
                }}
                ariaHideApp={false}
            >
                <ConfirmModalContent />
            </Modal>
            <div className="bg-gray-200 rounded p-5">
                <div className="flex ">
                    <h2 className="text-lg bold">{label}</h2>
                    <Button
                        text={`チェック済みの${label}をアーカイブ`}
                        type="submit"
                        color="secondary"
                        className="ml-auto"
                        onClickEvent={() => {
                            handleOpen('disableConfirm')
                        }}
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
                    <form>
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
                                                    CHECKBOX_REGISTER_PREFIX +
                                                        classification.id
                                                )}
                                                className="rounded"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            {...register(
                                                TEXT_FORM_REGISTER_PREFIX +
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
                                            TEXT_FORM_REGISTER_PREFIX +
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
                                type="button"
                                color="primary"
                                className="ml-auto"
                                onClickEvent={() => {
                                    handleOpen('updateConfirm')
                                }}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Content
