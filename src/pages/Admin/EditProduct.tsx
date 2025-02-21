
import { zodResolver } from "@hookform/resolvers/zod";
import FormComponent from "@/components/Form/FormComponent";
import { updateProductSchema } from "@/schema/productValidationSchema";
import { useGetSingleProductQuery, useUpdateProductMutation } from "@/redux/features/admin/productManagement.api";
import FormInput from "@/components/Form/FormInput";
import FormTextarea from "@/components/Form/FormTextarea";
import FormSelect, { TOption } from "@/components/Form/FormSelect";
import DynamicImageInput from "@/components/Form/DynamicImageInput";
import ColorPickerInput from "@/components/Form/ColorPickerInput";
import FormCheckbox from "@/components/Form/FormCheckbox";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";

const carCategories = [
    "Sedan", "Hatchback", "Coupe", "Convertible",
    "Compact SUV", "Mid-Size SUV", "Full-Size SUV",
    "Pickup Truck", "Minivan", "Cargo Van",
    "Sports Car", "Supercar", "Luxury Sedan/SUV",
    "Electric Vehicle (EV)", "Hybrid Car", "Plug-in Hybrid (PHEV)"
];

const EditProduct = () => {

    const { id: productId } = useParams<{ id: string }>();
    const { data: carData, isLoading } = useGetSingleProductQuery({ productId });

    const [updateProduct] = useUpdateProductMutation();

    const carOptions: TOption[] = carCategories.map((category) => (
        {
            label: category,
            value: category.toLowerCase(),
        }
    ))

    const handleProductUpdateSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        const toastId = toast.loading('Updating product...');
        try {
            const res = await updateProduct(data);
            console.log(res);
            toast.success('Successfully updated the product!', { id: toastId });
        }
        catch (err) {
            console.log("Failed to update the product.", err);
            toast.error('Something went wrong while updating the product!', { id: toastId });
        }
    }


    return isLoading ? (<div></div>) : (
        <FormComponent
            onSubmit={handleProductUpdateSubmit}
            resolver={zodResolver(updateProductSchema)}
            defaultValues={carData}
        >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="w-full p-6 mx-auto space-y-4 bg-white rounded-lg shadow-lg">
                    <FormInput name="_id" type="hidden" />
                    <h2 className="text-xl font-semibold text-gray-800">Car Basic Details</h2 >
                    <FormInput name="name" type="text" label="Product Title" />
                    <FormInput name="brand" type="text" label="Product Brand" />
                    <FormInput name="price" type="number" label="Product Price" />
                    <FormInput name="model" type="text" label="Product Model" />
                    <FormInput name="stock" type="number" label="Product Stock" />
                    <FormTextarea name="description" label="Product Description" />
                    <FormSelect name="category" label="Select Car Type" options={carOptions} />
                </div >
                <div className="w-full p-6 mx-auto space-y-12 bg-white rounded-lg shadow-lg">

                    <DynamicImageInput name="images" label="Product Image URLs" />
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 ">Car Specifications</h2>
                        <FormInput name="specifications.seatingCapacity" type="number" label="Seating Capacity" />
                        <FormInput name="specifications.fuelType" type="text" label="Fuel Type" />
                        <FormInput name="specifications.mileage" type="text" label="Mileage" />

                        <FormCheckbox label="Has AC" name="specifications.hasAC" />

                        <ColorPickerInput name="specifications.availableColors" label="Available Colors" />

                    </div>
                </div>
            </div >
            <Button type="submit" className="w-full mt-4">Update Car</Button>
        </FormComponent >
    );
};

export default EditProduct;