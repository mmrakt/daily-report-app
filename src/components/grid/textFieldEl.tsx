import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { ErrorMessage } from '@hookform/error-message'

type IProps = {
    name: string
    label: string
    id?: string
    autoComplete?: string
    type?: string
    value?: string
    disabled?: boolean
    multiline?: boolean
    rows?: number
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (any) => void
    onFocus?: (any) => void
    inputRef?: (ref: any) => void
    error?: boolean
    errors?: any
    render?: (data: { message: string; messages?: any }) => React.ReactNode
}
const TextFieldEl = (props: IProps): React.ReactElement => {
    const {
        name,
        label,
        id,
        autoComplete,
        type,
        value,
        disabled,
        multiline,
        rows,
        onChange,
        onBlur,
        onFocus,
        inputRef,
        error,
        errors,
        render,
    } = props
    return (
        <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id={id}
                label={label}
                name={name}
                type={type}
                value={value}
                disabled={disabled}
                multiline={multiline}
                rows={rows}
                autoComplete={autoComplete}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                inputRef={inputRef}
                error={error}
            />
            <ErrorMessage errors={errors} name={name} render={render} />
        </Grid>
    )
}

export default TextFieldEl
