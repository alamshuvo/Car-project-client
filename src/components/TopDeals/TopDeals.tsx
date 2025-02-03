import { TProduct } from "@/types";
import Car1 from '../../assets/images/car1.webp';
import Car2 from '../../assets/images/car2.webp';
import Car3 from '../../assets/images/car3.webp';
import Car4 from '../../assets/images/car4.webp';
import { User } from "lucide-react";
import SingleProduct from "../SingleProduct/SingleProduct";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const productData: TProduct[] = [
    {
        imageURL: Car1,
        title: 'Kia Syros',
        productLink: '',
        rating: 5,
        reviewCount: 1500,
        productProperties: [{
            title: '3 Seat',
            icon: <User />,
        }]
    },
    {
        imageURL: Car2,
        title: 'Kia Syros',
        productLink: '',
        rating: 5,
        reviewCount: 1500,
        productProperties: [{
            title: '3 Seat',
            icon: <User />,
        }]
    },
    {
        imageURL: Car3,
        title: 'Kia Syros',
        productLink: '',
        rating: 5,
        reviewCount: 1500,
        productProperties: [{
            title: '3 Seat',
            icon: <User />,
        }]
    },
    {
        imageURL: Car4,
        title: 'Kia Syros',
        productLink: '',
        rating: 5,
        reviewCount: 1500,
        productProperties: [
            {
                title: '3 Seat',
                icon: <User />,
            },
            {
                title: '3 Seat',
                icon: <User />,
            },
            {
                title: '3 Seat',
                icon: <User />,
            },
            {
                title: '3 Seat',
                icon: <User />,
            }
        ]
    },
];

const TopDeals = () => {
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