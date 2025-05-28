import CarouselComponent from "@/components/CarouselComponent/CarouselComponent";
import Faq from "@/components/Faq/Faq";
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent";
import OurServices from "@/components/OurServices/OurServices";
import OverView from "@/components/Overview/Overview";
import TopDeals from "@/components/TopDeals/TopDeals";
import { useGetTrendingProductsQuery } from "@/redux/features/admin/productManagement.api";


const Home = () => {


    const { data } = useGetTrendingProductsQuery([]);
    const images = data?.data.map((prod) => prod.images[0]);

    return (
        <div className="w-full">
            <HeaderComponent />
            <CarouselComponent images={images} carouselType={'images'} products={data?.data} />
            <TopDeals />
            <OurServices />
            <OverView></OverView>
            <Faq></Faq>
        </div>
    )
};

export default Home;