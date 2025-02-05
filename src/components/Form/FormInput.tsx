import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type TInput = {
    type: string,
    name: string,
    label?: string,
    placeholder?: string,
    readonly?: boolean
}

const FormInput = ({ type, name, label, readonly, placeholder }: TInput) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <Controller name={name} render={({ field, fieldState: { error } }) => <div>
                {label && <Label htmlFor={name}>{label}</Label>}
                <Input
                    placeholder={placeholder}
                    readOnly={readonly}
                    type={type}
                    id={name}
                    {...field}
                    onChange={(e) => field.onChange(type === "number" ? Number(e.target.value) : e.target.value)}
                />
                {error && <small style={{ color: "red" }}>{error.message}</small>}
            </div>} />
        </div>

    );
};

export default FormInput;