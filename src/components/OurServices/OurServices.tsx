import { TService } from "@/types";
import SingleService from "./SingleService";
import CarSales from "../../assets/images/car_sales.jpg";
import CarRepair from "../../assets/images/car_repair.jpg";
import CarWash from "../../assets/images/car_wash.jpg";
import CarInsurance from "../../assets/images/car_insurance.jpg";

const servicesData: TService[] = [
  {
    imageURL: CarSales,
    title: "New & Used Car Sales",
    description: `Explore our wide range of brand-new and certified pre-owned vehicles. We offer competitive pricing and flexible financing options to help you drive away in your dream car.`,
    seeMoreLink: "/services/car-sales",
  },
  {
    imageURL: CarRepair,
    title: "Expert Car Repair",
    description: `Our certified mechanics provide top-quality repair services, from engine diagnostics to brake repairs. We ensure your car runs smoothly and safely on the road.`,
    seeMoreLink: "/services/car-repair",
  },
  {
    imageURL: CarWash,
    title: "Premium Car Wash",
    description: `Keep your car looking brand new with our professional car wash services. Choose from exterior cleaning, interior detailing, and full-service packages.`,
    seeMoreLink: "/services/car-wash",
  },
  {
    imageURL: CarInsurance,
    title: "Insurance & Registration",
    description: `Get hassle-free car insurance and registration services under one roof. Our experts will guide you through the paperwork for a smooth and quick process.`,
    seeMoreLink: "/services/insurance-registration",
  },
];

const OurServices = () => {
  return (
    <div className="my-8">
      <h2 className="font-bold text-center text-red-500 mt-28">Our Services</h2>
      <h3 className="mb-12 text-5xl font-bold text-center uppercase text-blue-950">
        Our best service for you
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
        {servicesData.map((service, idx) => (
          <SingleService service={service} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default OurServices;
