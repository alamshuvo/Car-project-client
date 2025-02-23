import Logo from "@/assets/logos/Logo";

const About = () => {
    return (
        <div className="min-h-screen py-12 ">
            <div className="max-w-6xl px-6 mx-auto">
                {/* Title Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">
                        About CarValley
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Providing top-notch car repair and services since 2025
                    </p>
                </div>

                {/* Mission Section */}
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-semibold text-gray-700">Our Mission</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        At <strong>Speedy Auto Repairs</strong>, our mission is to provide
                        the best automotive services to ensure your car runs smoothly and
                        safely. We focus on quality repairs, excellent customer service, and
                        affordability.
                    </p>
                </div>

                {/* History Section */}
                <div className="flex flex-col items-center mb-16 space-y-8 md:flex-row md:space-x-12 md:space-y-0">
                    <div className="md:w-1/2">
                        <h2 className="mb-4 text-3xl font-semibold text-gray-700">Our Story</h2>
                        <p className="text-lg text-gray-600">
                            Founded in 1999, Speedy Auto Repairs started as a small family-owned
                            garage with a simple goal: to offer high-quality auto repairs at
                            affordable prices. Over the years, we have expanded our team of
                            skilled mechanics and added more advanced tools and technology to
                            better serve our customers. Today, we are proud to be one of the
                            top-rated auto repair shops in the city.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <Logo width={500} />
                    </div>
                </div>

                {/* Services Section */}
                <div className="mb-16 text-center">
                    <h2 className="mb-6 text-3xl font-semibold text-gray-700">Our Services</h2>
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                        <div className="p-8 bg-white rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-800">Engine Repair</h3>
                            <p className="mt-4 text-gray-600">
                                We provide comprehensive engine diagnostics and repair, ensuring
                                your car's engine runs like new.
                            </p>
                        </div>
                        <div className="p-8 bg-white rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-800">Tire Services</h3>
                            <p className="mt-4 text-gray-600">
                                From tire rotation to replacements, we offer full tire services
                                to keep you on the road safely.
                            </p>
                        </div>
                        <div className="p-8 bg-white rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-800">Brake Repairs</h3>
                            <p className="mt-4 text-gray-600">
                                Ensure your brakes are in optimal condition with our complete
                                brake inspection and repair services.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="py-12 mb-16 bg-gray-100 rounded-lg">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="mb-4 text-3xl font-semibold text-gray-700">
                            Why Choose Us?
                        </h2>
                        <p className="text-lg text-gray-600">
                            We are committed to excellence. Here's why our customers choose us:
                        </p>
                        <ul className="mt-6 space-y-4 text-left text-gray-600">
                            <li className="flex items-center">
                                <span className="mr-3 text-blue-500">✔️</span> Certified
                                Technicians with years of experience
                            </li>
                            <li className="flex items-center">
                                <span className="mr-3 text-blue-500">✔️</span> Fast and
                                reliable service
                            </li>
                            <li className="flex items-center">
                                <span className="mr-3 text-blue-500">✔️</span> Affordable and
                                transparent pricing
                            </li>
                            <li className="flex items-center">
                                <span className="mr-3 text-blue-500">✔️</span> 100% Customer
                                Satisfaction Guarantee
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Contact Us Section */}
                <div className="text-center">
                    <h2 className="mb-6 text-3xl font-semibold text-gray-700">Get in Touch</h2>
                    <p className="mb-4 text-lg text-gray-600">
                        Have questions? Need to book an appointment? Contact us today!
                    </p>

                    <a href="/contact">
                        <button className="px-8 py-3 text-lg text-white bg-blue-600 rounded-lg">
                            Contact Us
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
