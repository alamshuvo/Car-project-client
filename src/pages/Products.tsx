
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import Car1 from '../assets/images/car1.webp';
import Car2 from '../assets/images/car2.webp';
import Car3 from '../assets/images/car3.webp';
import Car4 from '../assets/images/car4.webp';
import { User2 } from "lucide-react";
import { TProduct } from "@/types";
import SingleProduct from "@/components/SingleProduct/SingleProduct";

const productData: TProduct[] = [
    {
        imageURL: Car1,
        title: 'Kia Syros',
        productLink: '',
        rating: 5,
        reviewCount: 1500,
        productProperties: [{
            title: '3 Seat',
            icon: <User2 />,
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
            icon: <User2 />,
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
            icon: <User2 />,
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
                icon: <User2 />,
            },
            {
                title: '3 Seat',
                icon: <User2 />,
            },
            {
                title: '3 Seat',
                icon: <User2 />,
            },
            {
                title: '3 Seat',
                icon: <User2 />,
            }
        ]
    },
];

const Products = () => {
    return (
        <div>
            <h3 className='text-5xl font-bold text-center uppercase text-blue-950'>
                Explore All Vehicles
            </h3>
            <div className="grid grid-cols-1 gap-4 my-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {productData.map((product, idx) => <SingleProduct product={product} key={idx} />)}
            </div>

            <Pagination className="mb-8">
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