import CarouselComponent from "@/components/CarouselComponent/CarouselComponent";
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent";
import OurServices from "@/components/OurServices/OurServices";
import TopDeals from "@/components/TopDeals/TopDeals";
import { useGetTrendingProductsQuery } from "@/redux/features/admin/productManagement.api";


const Home = () => {


    const { data } = useGetTrendingProductsQuery([]);
    console.log({ data });
    const images = data?.data.map((prod) => prod.images[0]);
    console.log(images);

    return (
        <div className="w-full">
            <HeaderComponent />
            <CarouselComponent images={images} carouselType={'images'} products={data?.data} />
            <TopDeals />
            <OurServices />
        </div>
    )
};

export default Home;