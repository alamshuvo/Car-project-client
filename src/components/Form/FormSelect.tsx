import { Controller, useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { FormControl, FormItem, FormMessage } from "../ui/form";

export type TOption = { value: string; label: string };

type TPHSelectProps = {
    name: string;
    label: string;
    options: TOption[];
    disabled?: boolean;
    placeholder?: string;
};

const FormSelect = ({ name, label, options, disabled, placeholder = "Select an option" }: TPHSelectProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormItem>
                    {label && <Label htmlFor={name}>{label}</Label>}
                    <Select disabled={disabled} onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {error && <FormMessage>{error.message}</FormMessage>}
                </FormItem>
            )}
        />
    );
};

export default FormSelect;
