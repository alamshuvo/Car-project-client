import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from 'embla-carousel-autoplay'

const CarouselComponent = () => {
    return (
        <div>
            <h3 className="my-16 text-5xl font-bold text-center uppercase">Trending products</h3>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 3000
                    }),
                ]}
                opts={{ align: "start", loop: true, duration: 100 }}
            >
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex h-[400px] items-center justify-center p-6 aspect-auto">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="hidden md:inline-flex" />
                <CarouselNext className="hidden md:inline-flex" />

                <div className="relative flex justify-between w-full mt-8 md:hidden">
                    <CarouselPrevious className="static" />
                    <CarouselNext className="static" />
                </div>
            </Carousel>
        </div>
    );
};

export default CarouselComponent;