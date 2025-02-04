import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { AirVent, Fuel, Menu, ParkingMeter } from "lucide-react";
import Car1 from "../assets/images/car1.webp";
import { User2 } from "lucide-react";
import { TUIProduct } from "@/types";
import SingleProduct from "@/components/SingleProduct/SingleProduct";
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import ProductListSkeleton from "@/components/ProductListSkeleton/ProductListSkeleton";
// Sample car product data following the schema
const dummyProducts = [
    {
        name: "Civic Sedan 2024",
        brand: "Honda",
        price: 25000,
        model: "Civic",
        stock: 15,
        description: "The all-new Honda Civic combines exceptional comfort with outstanding performance",
        category: "Sedan",
        images: [
            "civic-front.jpg",
            "civic-side.jpg",
            "civic-interior.jpg"
        ],
        ratings: "4.5",
        specifications: {
            seatingCapacity: 5,
            fuelType: "Petrol",
            mileage: "30 k",
            hasAC: true,
            availableColors: ["Crystal Black", "Platinum White", "Sonic Gray", "Rallye Red"]
        },
        isDeleted: false
    },
    {
        name: "Fortuner 4x4",
        brand: "Toyota",
        price: 42000,
        model: "Fortuner",
        stock: 8,
        description: "A powerful SUV that combines luxury with off-road capabilities",
        category: "SUV",
        images: [
            "fortuner-front.jpg",
            "fortuner-side.jpg",
            "fortuner-back.jpg"
        ],
        ratings: "4.8",
        specifications: {
            seatingCapacity: 7,
            fuelType: "Diesel",
            mileage: "15 k",
            hasAC: true,
            availableColors: ["Phantom Black", "Super White", "Attitude Black"]
        },
        isDeleted: false
    },
    {
        name: "Swift LXi",
        brand: "Suzuki",
        price: 18000,
        model: "Swift",
        stock: 25,
        description: "Perfect combination of style and efficiency for urban driving",
        category: "Hatchback",
        images: [
            "swift-front.jpg",
            "swift-side.jpg"
        ],
        ratings: "4.3",
        specifications: {
            seatingCapacity: 5,
            fuelType: "Petrol",
            mileage: "23.2 k",
            hasAC: true,
            availableColors: ["Fire Red", "Pearl White", "Midnight Blue", "Granite Gray"]
        },
        isDeleted: false
    },
    {
        name: "XUV700",
        brand: "Mahindra",
        price: 35000,
        model: "XUV700",
        stock: 12,
        description: "Advanced technology meets powerful performance",
        category: "SUV",
        images: [
            "xuv-front.jpg",
            "xuv-interior.jpg",
            "xuv-back.jpg"
        ],
        ratings: "4.6",
        specifications: {
            seatingCapacity: 7,
            fuelType: "Diesel",
            mileage: "16 k",
            hasAC: true,
            availableColors: ["Electric Blue", "Midnight Black", "Everest White"]
        },
        isDeleted: false
    },
    {
        name: "City ZX",
        brand: "Honda",
        price: 28000,
        model: "City",
        stock: 18,
        description: "Premium sedan with class-leading features and comfort",
        category: "Sedan",
        images: [
            "city-front.jpg",
            "city-side.jpg"
        ],
        ratings: "4.4",
        specifications: {
            seatingCapacity: 5,
            fuelType: "Petrol",
            mileage: "24.1 k",
            hasAC: true,
            availableColors: ["Radiant Red", "Platinum White", "Golden Brown", "Lunar Silver"]
        },
        isDeleted: false
    }
];


const productData: TUIProduct[] = dummyProducts.map(product => ({
    imageURL: Car1,
    title: product.name,
    brand: product.brand,
    price: product.price,
    stock: product.stock,
    category: product.category,
    productProperties: [
        {
            icon: <User2 />,
            title: `${product.specifications.seatingCapacity} Seat`
        },
        {
            icon: <Fuel />,
            title: product.specifications.fuelType,
        },
        {
            icon: <ParkingMeter />,
            title: product.specifications.mileage,
        },
        {
            icon: <AirVent />,
            title: product.specifications.hasAC ? 'AC' : 'No AC'
        }
    ],
    productLink: '',
    rating: parseFloat(product.ratings),
    reviewCount: 1500

}))

const brands = ["Honda", "Toyota", "Suzuki", "Mahindra"];
const categories = ["SUV", "Hatchback", "Sedan"];

const Products = () => {
    const [params, setParams] = useState([]);
    const { data, isLoading, isFetching } = useGetAllProductsQuery(params);
    console.log(data);

    const [priceRange, setPriceRange] = useState([10000, 50000]);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [inStockOnly, setInStockOnly] = useState(false);

    if (isLoading || isFetching) {
        return <ProductListSkeleton />
    }
    return (
        <div className="flex flex-col">
            <h3 className="my-12 text-5xl font-bold text-center uppercase text-blue-950">
                Explore All Vehicles
            </h3>
            <div className="flex flex-col md:flex-row">
                {/* Sidebar for filters (Desktop) */}
                <div className="hidden w-1/5 p-4 border-r md:block">
                    <FilterSection
                        setParams={setParams}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        setSelectedBrand={setSelectedBrand}
                        setSelectedCategory={setSelectedCategory}
                        inStockOnly={inStockOnly}
                        setInStockOnly={setInStockOnly}
                    />
                </div>

                {/* Mobile Filter Drawer */}
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline" className="flex items-center m-4 md:hidden">
                            <Menu className="w-5 h-5 mr-2" /> Filters
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="p-4">
                        <FilterSection
                            setParams={setParams}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            setSelectedBrand={setSelectedBrand}
                            setSelectedCategory={setSelectedCategory}
                            inStockOnly={inStockOnly}
                            setInStockOnly={setInStockOnly}
                        />
                    </DrawerContent>
                </Drawer>

                {/* Products List */}
                <div className="flex-1 p-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {productData
                            .filter((product) =>
                                selectedBrand ? product.brand.includes(selectedBrand) : true
                            )
                            .filter((product) =>
                                selectedCategory ? product.category.toLowerCase().includes(selectedCategory.toLowerCase()) : true
                            )
                            .filter(({ stock }) => inStockOnly ? stock > 0 : true)
                            .filter(({ price }) => price >= priceRange[0] && price <= priceRange[1])

                            .map((product, idx) => (
                                <SingleProduct product={product} key={idx} />
                            ))}
                    </div>
                </div>

            </div>
            {/* Pagination */}
            <Pagination className="my-8">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

type TFilterSectionProps = {
    priceRange: number[];
    setPriceRange: (value: number[]) => void;
    setSelectedBrand: (value: string) => void;
    setSelectedCategory: (value: string) => void;
    inStockOnly: boolean;
    setInStockOnly: (value: boolean) => void;
    setParams: (value: []) => void;
};

const FilterSection = ({
    priceRange,
    setPriceRange,
    setSelectedBrand,
    setSelectedCategory,
    inStockOnly,
    setInStockOnly,
    setParams
}: TFilterSectionProps) => {
    function applyFilters(): void {
        setParams([]);
    }

    return (
        <Card className="p-4">
            <h4 className="mb-4 text-xl font-semibold">Filters</h4>

            {/* Brand Filter */}
            <Select onValueChange={setSelectedBrand}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                    {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                            {brand}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Category Filter */}
            <div className="mt-4">
                <Select onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

            </div>
            {/* Price Range Filter */}
            <div className="mt-4">
                <p className="text-sm">Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
                <Slider min={10000} max={100000} defaultValue={priceRange} onValueChange={setPriceRange} />
            </div>

            {/* Stock Availability */}
            <div className="flex items-center mt-4 space-x-2">
                <Checkbox checked={inStockOnly} onCheckedChange={setInStockOnly} />
                <span>In Stock Only</span>
            </div>

            <Button className="w-full mt-4" onClick={applyFilters}>Apply Filters</Button>
        </Card>
    );
};

export default Products;
