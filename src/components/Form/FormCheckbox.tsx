import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

type TInput = {
    name: string;
    label?: string;
    readonly?: boolean;
}

const FormCheckbox = ({ name, label, readonly }: TInput) => {
    const { control } = useFormContext();

    return (
        <div style={{ marginBottom: '10px' }}>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
                    <div className="flex items-center">
                        {label && <Label htmlFor={name} className="mr-4"> {label} </Label>}
                        <Checkbox
                            checked={value}
                            onCheckedChange={readonly ? () => { } : onChange}
                            id={name}
                            {...field}
                        />
                        {error && <small style={{ color: "red" }}>{error.message}</small>}
                    </div>
                )}
            />
        </div>
    );
};

export default FormCheckbox;