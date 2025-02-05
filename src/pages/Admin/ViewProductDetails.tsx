
import { zodResolver } from "@hookform/resolvers/zod";
import FormComponent from "@/components/Form/FormComponent";
import { createProductSchema } from "@/schema/productValidationSchema";
import { useGetSingleProductQuery } from "@/redux/features/admin/productManagement.api";
import FormInput from "@/components/Form/FormInput";
import FormTextarea from "@/components/Form/FormTextarea";
import FormSelect, { TOption } from "@/components/Form/FormSelect";
import DynamicImageInput from "@/components/Form/DynamicImageInput";
import ColorPickerInput from "@/components/Form/ColorPickerInput";
import FormCheckbox from "@/components/Form/FormCheckbox";
import { useParams } from "react-router-dom";

const carCategories = [
    "Sedan", "Hatchback", "Coupe", "Convertible",
    "Compact SUV", "Mid-Size SUV", "Full-Size SUV",
    "Pickup Truck", "Minivan", "Cargo Van",
    "Sports Car", "Supercar", "Luxury Sedan/SUV",
    "Electric Vehicle (EV)", "Hybrid Car", "Plug-in Hybrid (PHEV)"
];

const ViewProductDetails = () => {

    const { id: productId } = useParams<{ id: string }>();
    const { data, isLoading } = useGetSingleProductQuery({ productId });
    console.log(data);

    const carOptions: TOption[] = carCategories.map((category) => (
        {
            label: category,
            value: category.toLowerCase(),
        }
    ))


    return isLoading ? (<div></div>) : (
        <FormComponent
            onSubmit={() => { }}
            resolver={zodResolver(createProductSchema)}
            defaultValues={data}
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="w-full p-6 mx-auto space-y-4 bg-white rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800">Car Basic Details</h2 >
                    <FormInput readonly={true} name="name" type="text" label="Product Title" />
                    <FormInput readonly={true} name="brand" type="text" label="Product Brand" />
                    <FormInput readonly={true} name="price" type="number" label="Product Price" />
                    <FormInput readonly={true} name="model" type="text" label="Product Model" />
                    <FormInput readonly={true} name="stock" type="number" label="Product Stock" />
                    <FormTextarea name="description" label="Product Description" />
                    <FormSelect name="category" label="Select Car Type" options={carOptions} />
                </div >
                <div className="w-full p-6 mx-auto space-y-12 bg-white rounded-lg shadow-lg">

                    <DynamicImageInput name="images" label="Product Image URLs" readonly={true} />
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 ">Car Specifications</h2>
                        <FormInput readonly={true} name="specifications.seatingCapacity" type="number" label="Seating Capacity" />
                        <FormInput readonly={true} name="specifications.fuelType" type="text" label="Fuel Type" />
                        <FormInput readonly={true} name="specifications.mileage" type="text" label="Mileage" />

                        <FormCheckbox label="Has AC" name="specifications.hasAC" readonly={true} />

                        <ColorPickerInput name="specifications.availableColors" label="Available Colors" readonly={true} />

                    </div>
                </div>
            </div >
        </FormComponent >
    );
};

export default ViewProductDetails;