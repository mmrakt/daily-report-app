import React from 'react'
import { Role, Category, Project } from '@prisma/client'
import { ToastContainer } from 'react-toastify'
import Button from '@/components/common/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'
const Content: React.FC<{
    classifications: Role[] | Category[] | Project[]
    label: string
}> = ({ classifications, label }) => {
    const { register, handleSubmit, formState, setValue } = useForm({
        criteriaMode: 'all',
        mode: 'onChange',
    })

    useEffect(() => {
        classifications.forEach((classification) => {
            setValue(`classification.${classification.id}`, classification.name)
        })
    }, [classifications])

    const onSubmit = () => {
        console.log('')
    }

    return (
        <>
            <ToastContainer />
            <div className="bg-gray-200 rounded p-5">
                <div className="p-3">
                    <h2 className="text-lg bold">{label}</h2>
                </div>
                <div className="class">
                    <ul className="class">
                        {classifications &&
                            classifications.map((classification) => (
                                <li className="" key={classification.id}>
                                    <input
                                        type="text"
                                        name={`classification.${classification.id}`}
                                        {...register(
                                            `classification.${classification.id}`
                                        )}
                                    />
                                    <Button
                                        text="更新"
                                        onClickEvent={onSubmit}
                                        color="primary"
                                    />
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Content
