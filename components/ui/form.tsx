'use client'

import { createContext, useContext, useId } from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName
}

interface FormItemContextValue {
  id: string
}

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  }
}

interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.ComponentProps<'div'> {
  control?: Control<TFieldValues>
  name: TName
  render: ({ field }: { field: any }) => React.ReactElement
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ control, name, render, ...props }: FormFieldProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem {...props}>
            {render({ field })}
          </FormItem>
        )}
      />
    </FormFieldContext.Provider>
  )
}

interface FormItemProps extends React.ComponentProps<'div'> {}

export function FormItem({ className, ...props }: FormItemProps) {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={`space-y-2 ${className || ''}`} {...props} />
    </FormItemContext.Provider>
  )
}

interface FormLabelProps extends React.ComponentProps<'label'> {}

export function FormLabel({ className, ...props }: FormLabelProps) {
  const { formItemId } = useFormField()

  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300 ${className || ''}`}
      htmlFor={formItemId}
      {...props}
    />
  )
}

interface FormControlProps extends React.ComponentProps<'div'> {}

export function FormControl({ ...props }: FormControlProps) {
  const { formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <div
      id={formItemId}
      aria-describedby={`${formDescriptionId} ${formMessageId}`}
      {...props}
    />
  )
}

interface FormDescriptionProps extends React.ComponentProps<'p'> {}

export function FormDescription({ className, ...props }: FormDescriptionProps) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      id={formDescriptionId}
      className={`text-sm text-gray-500 dark:text-gray-400 ${className || ''}`}
      {...props}
    />
  )
}

interface FormMessageProps extends React.ComponentProps<'p'> {}

export function FormMessage({ className, children, ...props }: FormMessageProps) {
  const { formMessageId } = useFormField()

  if (!children) {
    return null
  }

  return (
    <p
      id={formMessageId}
      className={`text-sm font-medium text-red-600 dark:text-red-400 ${className || ''}`}
      {...props}
    >
      {children}
    </p>
  )
}