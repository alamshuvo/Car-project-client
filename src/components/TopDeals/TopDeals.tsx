import { TUIProduct } from "@/types";
import { AirVent, Fuel, ParkingMeter, User2 } from "lucide-react";
import SingleProduct from "../SingleProduct/SingleProduct";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "@/redux/features/admin/productManagement.api";


const TopDeals = () => {

    const { data } = useGetTopProductsQuery([]);
    let productData: TUIProduct[] = [];
    if (data?.data) {
        const responseData = data?.data;
        productData = responseData.map(product => ({
            _id: product._id,
            imageURL: product.images[Math.floor(Math.random() * product.images.length)],
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


    return (
        <div>
            <h2 className="font-bold text-left text-red-500 mt-28">Our Vehicle</h2>
            <div className="flex flex-col items-end justify-between mb-12 md:items-center md:flex-row">
                <h3 className='text-5xl font-bold text-left uppercase text-blue-950'>
                    Explore Our top deal
                </h3>
                <Link to={'/products'}><Button>See All Vehicles</Button></Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {productData.map((product, idx) => <SingleProduct product={product} key={idx} />)}
            </div>
        </div>
    );
};

export default TopDeals;