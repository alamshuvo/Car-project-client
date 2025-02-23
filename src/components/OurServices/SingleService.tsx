import { TService } from "@/types";
import { Card, CardContent } from "../ui/card";

interface ISingleService {
    service: TService,
}
const SingleService = ({ service }: ISingleService) => {
    return (
        <Card>
            <CardContent className="p-4">
                <img src={service.imageURL} className="h-[200px] w-full rounded-xl" alt="" />
                <h3 className="my-3 text-2xl font-bold text-blue-800">
                    {service.title}
                </h3>
                <p>
                    {service.description}
                </p>
                {/* <Button className="px-6 py-5 mt-4">See More</Button> */}
            </CardContent>
        </Card>
    );
};

export default SingleService;