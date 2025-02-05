import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TrashIcon, PlusIcon } from "lucide-react";

const DynamicImageInput = ({ name, label, readonly }: { name: string; label?: string, readonly?: boolean }) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return (
        <div className="space-y-2">
            {label && <h2 className="text-xl font-semibold text-gray-800">{label}</h2>}

            {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                    <Controller
                        name={`${name}[${index}]`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <div className="flex flex-col w-full">
                                <Input type="text" placeholder="Enter image URL" {...field} readOnly={readonly} />
                                {error && <small style={{ color: "red" }}>{error.message}</small>}
                            </div>
                        )}
                    />
                    {!readonly && fields.length > 1 && (
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                            <TrashIcon className="w-5 h-5" />
                        </Button>
                    )}
                </div>
            ))}

            {!readonly && <Button type="button" variant="outline" onClick={() => append("")}>
                <PlusIcon className="w-4 h-4 mr-2" /> Add Image
            </Button>}
        </div>
    );
};


export default DynamicImageInput;
