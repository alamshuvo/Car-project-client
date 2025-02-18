import { TUIProduct } from "@/types";
import Car1 from '../../assets/images/car1.webp';
import { AirVent, Fuel, ParkingMeter, User2 } from "lucide-react";
import SingleProduct from "../SingleProduct/SingleProduct";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

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


const TopDeals = () => {

    // const products

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