import Logo from "@/assets/logos/Logo";

const Contact = () => {
    return (
        <div className="min-h-screen py-12">
            <div className="max-w-6xl px-6 mx-auto">
                {/* Title Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Contact CarValley</h1>
                    <p className="mt-4 text-xl text-gray-600">
                        We're here to help! Reach out to us for any inquiries or appointments.
                    </p>
                </div>

                {/* Contact Information Section */}
                <div className="flex flex-col items-center mb-16 space-y-8 md:flex-row md:space-x-12 md:space-y-0">
                    <div className="md:w-1/2">
                        <h2 className="mb-4 text-3xl font-semibold text-gray-700">Our Contact Details</h2>
                        <p className="text-lg text-gray-600">
                            <strong>Address:</strong> 1234 Car Street, AutoTown, CA 90210
                        </p>
                        <p className="mt-4 text-lg text-gray-600">
                            <strong>Phone:</strong> +1 (800) 123-4567
                        </p>
                        <p className="mt-4 text-lg text-gray-600">
                            <strong>Email:</strong> support@carvalley.com
                        </p>
                        <p className="mt-4 text-lg text-gray-600">
                            <strong>Business Hours:</strong> Mon - Sat: 8 AM - 6 PM
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <Logo width={500} />
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="mb-16 text-center">
                    <h2 className="mb-6 text-3xl font-semibold text-gray-700">Send Us a Message</h2>
                    <form className="max-w-2xl mx-auto space-y-6">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            className="w-full h-32 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full px-8 py-3 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Location Map Section */}
                <div className="py-12 mb-16 bg-gray-100 rounded-lg">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="mb-4 text-3xl font-semibold text-gray-700">Visit Us</h2>
                        <p className="text-lg text-gray-600">Find us at our service center location.</p>
                        <div className="mt-6 overflow-hidden rounded-lg shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509812!2d144.95373631531754!3d-37.81720997975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f3f6f1fd%3A0x5045675218ce840!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1618908978293!5m2!1sen!2sus"
                                width="100%"
                                height="400"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
