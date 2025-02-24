import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import { AirVent, Box, Fuel, Menu, ParkingMeter } from "lucide-react";
import { User2 } from "lucide-react";
import { TQueryParam, TUIProduct } from "@/types";
import SingleProduct from "@/components/SingleProduct/SingleProduct";
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.api";
import ProductListSkeleton from "@/components/ProductListSkeleton/ProductListSkeleton";
import ProductFilterSection from "@/components/ProductFilterSection/ProductFilterSection";
import { Skeleton } from "@/components/ui/skeleton";

const Products = () => {

  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data, isLoading, isFetching } = useGetAllProductsQuery(params);
  let productData: TUIProduct[] = [];
  const meta = data?.meta;
  if (data?.data) {
    const responseData = data?.data;
    productData = responseData.map((product) => ({
      _id: product._id,
      imageURL:
        product.images[Math.floor(Math.random() * product.images.length)],
      title: product.name,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
      category: product.category,
      productProperties: [
        {
          icon: <User2 />,
          title: `${product.specifications.seatingCapacity} Seat`,
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
          title: product.specifications.hasAC ? "AC" : "No AC",
        },
      ],
      productLink: "",
      reviewCount: product.totalReviews ?? 0,
      rating: product.averageRating ?? 0,
    }));
  }

  const [priceRange, setPriceRange] = useState([10000, 50000]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [page, setPage] = useState(1);

  const updateFilter = () => {
    setParams([
      { name: "price", value: `${priceRange[0]}-${priceRange[1]}` },
      { name: "brand", value: selectedBrand as string },
      { name: "category", value: selectedCategory as string },
      { name: "stock", value: inStockOnly ? ">0" : "0" },
    ]);
  };

  useEffect(() => {
    const newParams = [...params];
    newParams.push({ name: "page", value: `${page}` },)
    setParams(newParams);
  }, [page]);
  return (
    <div className="flex flex-col w-full">
      <h3 className="my-12 text-5xl font-bold text-center uppercase text-blue-950">
        Explore All Vehicles
      </h3>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar for filters (Desktop) */}
        <div className="hidden w-1/5 p-4 border-r lg:block">
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
            <Button
              variant="outline"
              className="flex items-center m-4 lg:hidden"
            >
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
        {isLoading || isFetching ? (
          <ProductListSkeleton />
        ) : (
          <div className="flex-1 p-4">
            <div
              className={`grid grid-cols-1 ${!productData.length ? "" : "gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"}`}
            >
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
        )}
      </div>
      {/* Pagination */}
      {isLoading || isFetching ? (
        <div className="flex justify-center my-8">
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} className="w-8 h-8 rounded" />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between mt-6">
          <p>
            Showing{" "}
            {meta!.page === 1 ? 1 : meta!.page * meta!.limit - meta!.limit + 1} to{" "}
            {meta!.page * meta!.limit > meta!.total
              ? meta!.total
              : meta!.page * meta!.limit}{" "}
            of total {meta!.total}
          </p>
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage(page > 1 ? page - 1 : 1)}
                  />
                </PaginationItem>
                {Array.from({ length: meta!.totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      isActive={page === index + 1}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setPage(
                        page === meta!.totalPages ? meta!.totalPages : page + 1,
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
