import { TService } from "@/types";
import SingleService from "./SingleService";
import Service1 from '../../assets/images/service_1.png';
import Service2 from '../../assets/images/service_2.png';


const servicesData: TService[] = [
    {
        imageURL: Service1,
        description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis explicabo id soluta vero earum dolores esse recusandae vitae magnam omnis totam est neque tenetur impedit quisquam, aut velit suscipit ullam.`,
        seeMoreLink: '',
        title: 'Online Booking'
    },
    {
        imageURL: Service2,
        description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis explicabo id soluta vero earum dolores esse recusandae vitae magnam omnis totam est neque tenetur impedit quisquam, aut velit suscipit ullam.`,
        seeMoreLink: '',
        title: 'Online Booking'
    },
    {
        imageURL: Service2,
        description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis explicabo id soluta vero earum dolores esse recusandae vitae magnam omnis totam est neque tenetur impedit quisquam, aut velit suscipit ullam.`,
        seeMoreLink: '',
        title: 'Online Booking'
    },
    {
        imageURL: Service2,
        description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis explicabo id soluta vero earum dolores esse recusandae vitae magnam omnis totam est neque tenetur impedit quisquam, aut velit suscipit ullam.`,
        seeMoreLink: '',
        title: 'Online Booking'
    },
];


const OurServices = () => {
    return (
        <div className="my-8">
            <h2 className="font-bold text-center text-red-500 mt-28">Our Services</h2>
            <h3 className='mb-12 text-5xl font-bold text-center uppercase text-blue-950'>
                Our best service for you
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {servicesData.map((service, idx) => <SingleService service={service}  key={idx} />)}
            </div>
        </div>
    );
};

export default OurServices;