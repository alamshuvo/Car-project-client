import { ReactNode, useEffect } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type TFormConfig = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValues?: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver?: any;
}
type TFormProps = {
    onSubmit: SubmitHandler<FieldValues>,
    children: ReactNode,
} & TFormConfig;

const FormComponent = ({ onSubmit, children, defaultValues, resolver }: TFormProps) => {
    const formConfig: TFormConfig = {};
    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues;
    }
    if (resolver) {
        formConfig['resolver'] = resolver;
    }
    const methods = useForm(formConfig);
    // Reset form when defaultValues change
    useEffect(() => {
        if (defaultValues) {
            methods.reset(defaultValues);
        }
    }, [defaultValues, methods]);
    const submit: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data);
        methods.reset();
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submit)}>
                {children}
            </form>
        </FormProvider>
    );
};

export default FormComponent;