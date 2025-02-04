
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";


type TProductFilterSectionProps = {
    priceRange: number[];
    setPriceRange: (value: number[]) => void;
    selectedBrand: string | null,
    setSelectedBrand: (value: string) => void;
    selectedCategory: string | null,
    setSelectedCategory: (value: string) => void;
    inStockOnly: boolean;
    setInStockOnly: (value: boolean) => void;
    updateFilter: () => void;
};

const ProductFilterSection = ({
    priceRange,
    setPriceRange,
    selectedBrand,
    setSelectedBrand,
    selectedCategory,
    setSelectedCategory,
    inStockOnly,
    setInStockOnly,
    updateFilter
}: TProductFilterSectionProps) => {
    function applyFilters(): void {
        updateFilter();
    }

    const brands = ["Honda", "Toyota", "Suzuki", "Mahindra"];
    const categories = ["SUV", "Hatchback", "Sedan"];

    return (
        <Card className="p-4">
            <h4 className="mb-4 text-xl font-semibold">Filters</h4>

            {/* Brand Filter */}
            <Select onValueChange={setSelectedBrand} defaultValue={selectedBrand as string}>
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
                <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory as string}>
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

export default ProductFilterSection;