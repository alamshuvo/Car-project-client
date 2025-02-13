import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "@/redux/features/admin/productManagement.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { TProduct } from "@/types";


const ViewProductDetails = () => {
    const { id: productId } = useParams<{ id: string }>();
    const { data, isLoading } = useGetSingleProductQuery({ productId });

    if (isLoading) {
        return <Skeleton className="w-full h-64" />;
    }

    console.log(data);
    const productData = data as TProduct;

    return (
        <div className="container grid grid-cols-1 gap-6 px-4 py-6 mx-auto lg:grid-cols-2">
            {/* Car Basic Details */}
            <Card>
                <CardHeader>
                    <CardTitle>{productData?.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Brand</TableCell>
                                <TableCell>{productData?.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Model</TableCell>
                                <TableCell>{productData?.model}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Price</TableCell>
                                <TableCell>${productData?.price}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Stock</TableCell>
                                <TableCell>{productData?.stock}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Category</TableCell>
                                <TableCell>{productData?.category}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Car Specifications */}
            <Card>
                <CardHeader>
                    <CardTitle>Car Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Seating Capacity</TableCell>
                                <TableCell>{productData?.specifications?.seatingCapacity}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Fuel Type</TableCell>
                                <TableCell>{productData?.specifications?.fuelType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Mileage</TableCell>
                                <TableCell>{productData?.specifications?.mileage}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Has AC</TableCell>
                                <TableCell>
                                    {productData?.specifications?.hasAC ? (
                                        <Badge className="bg-green-500">Yes</Badge>
                                    ) : (
                                        <Badge className="bg-red-500">No</Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Image Gallery */}
            <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                    <CardTitle>Images</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {productData?.images?.map((img: string, index: number) => (
                        <img key={index} src={img} alt="Car Image" width={150} height={150} className="rounded-lg shadow" />
                    ))}
                </CardContent>
            </Card>

            {/* Available Colors */}
            <Card>
                <CardHeader>
                    <CardTitle>Available Colors</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {productData?.specifications?.availableColors?.map((color: string, index: number) => (
                        <Badge key={index} style={{ backgroundColor: color }} className="w-16 h-16 px-4 py-1 text-white rounded" />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default ViewProductDetails;
