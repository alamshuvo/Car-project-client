import CarouselComponent from "@/components/CarouselComponent/CarouselComponent";
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent";
import OurServices from "@/components/OurServices/OurServices";
import TopDeals from "@/components/TopDeals/TopDeals";


const Home = () => {
    return (
        <div className="w-full">
            <HeaderComponent/>
            <CarouselComponent/>
            <TopDeals/>
            <OurServices/>
        </div>
    )
};

export default Home;