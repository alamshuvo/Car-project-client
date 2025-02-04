import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const ColorPickerInput = ({ name, label }: { name: string; label: string }) => {
    const { control, setValue, watch } = useFormContext();
    const colors = watch(name, []) || [];
    const [newColor, setNewColor] = useState("#000000");

    const addColor = () => {
        if (newColor && !colors.includes(newColor)) {
            setValue(name, [...colors, newColor]);
        }
    };

    const removeColor = (colorToRemove: string) => {
        setValue(name, colors.filter((color: string) => color !== colorToRemove));
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>

            <div className="flex items-center gap-2">
                <Input
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="w-12 h-10 border rounded-lg"
                />
                <Button type="button" onClick={addColor} className="px-3 py-1 text-sm">
                    Add Color
                </Button>
            </div>

            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {field.value?.map((color: string, index: number) => (
                            <div key={index} className="flex items-center gap-1 p-1 px-2 bg-gray-100 border rounded-lg">
                                <span
                                    className="w-5 h-5 border rounded-full"
                                    style={{ backgroundColor: color }}
                                ></span>
                                <span className="text-sm">{color}</span>
                                <button type="button" onClick={() => removeColor(color)}>
                                    <X className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                        ))}

                        {error && <small style={{ color: "red" }}>{error.message}</small>}
                    </div>
                )}
            />
        </div>
    );
};

export default ColorPickerInput;
