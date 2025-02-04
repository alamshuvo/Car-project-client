import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type TInput = {
    type: string,
    name: string,
    label?: string,
}

const FormInput = ({ type, name, label }: TInput) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <Controller name={name} render={({ field, fieldState: { error } }) => <div>
                {label && <Label htmlFor={name}>{label}</Label>}
                <Input style={{ marginTop: '5px' }} type={type} id={name} {...field} />
                {error && <small style={{ color: "red" }}>{error.message}</small>}
            </div>} />
        </div>

    );
};

export default FormInput;