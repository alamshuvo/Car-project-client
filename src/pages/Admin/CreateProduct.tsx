import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormComponent from "@/components/Form/FormComponent";
import { createProductSchema } from "@/schema/productValidationSchema";
import { toast } from "sonner";
import { TProduct, TResponseRedux } from "@/types";
import { useCreateProductMutation } from "@/redux/features/admin/productManagement.api";
import FormInput from "@/components/Form/FormInput";
import FormTextarea from "@/components/Form/FormTextarea";
import FormSelect, { TOption } from "@/components/Form/FormSelect";
import DynamicImageInput from "@/components/Form/DynamicImageInput";
import ColorPickerInput from "@/components/Form/ColorPickerInput";
import FormCheckbox from "@/components/Form/FormCheckbox";

const carCategories = [
    "Sedan", "Hatchback", "Coupe", "Convertible",
    "Compact SUV", "Mid-Size SUV", "Full-Size SUV",
    "Pickup Truck", "Minivan", "Cargo Van",
    "Sports Car", "Supercar", "Luxury Sedan/SUV",
    "Electric Vehicle (EV)", "Hybrid Car", "Plug-in Hybrid (PHEV)"
];

const CreateProduct = () => {
    const defaultValues = {
        name: "Honda Civic 2024",
        brand: "Honda",
        price: 25000,
        model: "Civic",
        stock: 15,
        description: "The all-new Honda Civic combines exceptional comfort with outstanding performance. Features include advanced safety technologies, premium interior design, and excellent fuel efficiency.",
        category: "sedan",
        images: [
            "https://imgd.aeplcdn.com/370x208/n/cw/ec/170173/dzire-2024-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
            "https://imgd.aeplcdn.com/370x208/n/cw/ec/124839/thar-roxx-exterior-right-front-three-quarter-24.jpeg?isig=0&q=80",
            "https://imgd.aeplcdn.com/370x208/n/cw/ec/102663/baleno-exterior-right-front-three-quarter-66.jpeg?isig=0&q=80"
        ],
        specifications: {
            seatingCapacity: 5,
            fuelType: "Petrol",
            mileage: "18.4 k",
            hasAC: true,
            availableColors: [
                "#000000",
                "#bc1a1a",
            ]
        }
    };

    const [createProduct] = useCreateProductMutation(undefined);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const loadingToast = toast.loading('Creating new product...');
        try {
            console.log(data);
            const res = await createProduct(data) as TResponseRedux<TProduct>;

            if (res.error) {
                toast.error(res.error?.data.message || 'Some error occurred while creating new product!', { id: loadingToast });
            } else {
                toast.success(res.message || 'New product created successfully!', { id: loadingToast });
            }
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong!', { id: loadingToast });
        }
    }

    const carOptions: TOption[] = carCategories.map((category) => (
        {
            label: category,
            value: category.toLowerCase(),
        }
    ))

    return (
        <FormComponent onSubmit={onSubmit} resolver={zodResolver(createProductSchema)} defaultValues={defaultValues}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="w-full p-6 mx-auto space-y-4 bg-white rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800">Enter Car Basic Details</h2>
                    <FormInput name="name" type="text" label="Product Title" />
                    <FormInput name="brand" type="text" label="Product Brand" />
                    <FormInput name="price" type="number" label="Product Price" />
                    <FormInput name="model" type="text" label="Product Model" />
                    <FormInput name="stock" type="number" label="Product Stock" />
                    <FormTextarea name="description" label="Product Description" />
                    <FormSelect name="category" label="Select Car Type" options={carOptions} />
                </div>
                <div className="w-full p-6 mx-auto space-y-12 bg-white rounded-lg shadow-lg">

                    <DynamicImageInput name="images" label="Add Product Image URLs" />
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 ">Enter Car Specifications</h2>
                        <FormInput name="specifications.seatingCapacity" type="text" label="Seating Capacity" />
                        <FormInput name="specifications.fuelType" type="text" label="Fuel Type" />
                        <FormInput name="specifications.mileage" type="text" label="Mileage" />

                        <FormCheckbox label="Has AC" name="specifications.hasAC" />

                        <ColorPickerInput name="specifications.availableColors" label="Available Colors" />

                        <Button type="submit" className="w-full">Create</Button>
                    </div>
                </div>
            </div>
        </FormComponent>

    );
};

export default CreateProduct;