import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import { AirVent, Box, Fuel, Menu, ParkingMeter } from "lucide-react";
import Car1 from "../assets/images/car1.webp";
import { User2 } from "lucide-react";
import { TQueryParam, TUIProduct } from "@/types";
import SingleProduct from "@/components/SingleProduct/SingleProduct";
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import ProductListSkeleton from "@/components/ProductListSkeleton/ProductListSkeleton";
import ProductFilterSection from "@/components/ProductFilterSection/ProductFilterSection";

const Products = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const { data, isLoading, isFetching } = useGetAllProductsQuery(params);
    let productData: TUIProduct[] = [];
    if (data?.data) {
        const responseData = data?.data;
        productData = responseData.map(product => ({
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
            rating: 4,
            reviewCount: 1500

        }))
    }

    const [priceRange, setPriceRange] = useState([10000, 50000]);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [inStockOnly, setInStockOnly] = useState(false);

    const updateFilter = () => {
        setParams([
            { name: 'price', value: `${priceRange[0]}-${priceRange[1]}` },
            { name: 'brand', value: selectedBrand as string },
            { name: 'category', value: selectedCategory as string },
            { name: 'stock', value: inStockOnly ? '>0' : '0' }
        ])
    }

    if (isLoading || isFetching) {
        return <ProductListSkeleton />
    }
    return (
        <div className="flex flex-col w-full">
            <h3 className="my-12 text-5xl font-bold text-center uppercase text-blue-950">
                Explore All Vehicles
            </h3>
            <div className="flex flex-col md:flex-row">
                {/* Sidebar for filters (Desktop) */}
                <div className="hidden w-1/5 p-4 border-r md:block">
                    <ProductFilterSection
                        updateFilter={updateFilter}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        setSelectedBrand={setSelectedBrand}
                        selectedBrand={selectedBrand}
                        setSelectedCategory={setSelectedCategory}
                        selectedCategory={selectedCategory}
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
                        <ProductFilterSection
                            updateFilter={updateFilter}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            setSelectedBrand={setSelectedBrand}
                            selectedBrand={selectedBrand}
                            setSelectedCategory={setSelectedCategory}
                            selectedCategory={selectedCategory}
                            inStockOnly={inStockOnly}
                            setInStockOnly={setInStockOnly}
                        />
                    </DrawerContent>
                </Drawer>

                {/* Products List */}
                <div className="flex-1 p-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {!productData.length && (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                <Box className="w-16 h-16 mb-4" />
                                <p>No products available for the selected filters</p>
                            </div>
                        )}
                        {productData.map((product, idx) => (
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


export default Products;
