import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type TInput = {
    name: string,
    label?: string,
}

const FormTextarea = ({ name, label }: TInput) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <Controller name={name} render={({ field, fieldState: { error } }) => <div>
                {label && <Label htmlFor={name}>{label}</Label>}
                <Textarea style={{ marginTop: '5px' }} id={name} {...field} />
                {error && <small style={{ color: "red" }}>{error.message}</small>}
            </div>} />
        </div>

    );
};

export default FormTextarea;