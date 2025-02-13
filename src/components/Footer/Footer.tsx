import Logo from "@/assets/logos/Logo";
import { Mail, Facebook, Twitter, Instagram, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="flex flex-col flex-1 gap-4 p-4 pt-0 mt-10 text-blue-800">
            {/* Footer Grid */}
            <div className="grid gap-4 auto-rows-min md:grid-cols-3">
                {/* Column 1: Company Info */}
                <div className="p-4 aspect-video rounded-xl bg-none">
                    <Link to={'/'}>
                        <Logo width={500} />
                    </Link>
                    <p>  &copy;{new Date().getFullYear()}. All rights reserved!</p>
                </div>

                {/* Column 2: Navigation Links */}
                <div className="p-4 aspect-video rounded-xl bg-muted/50">
                    <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>
                    <ul className="space-y-2 text-blue-950">
                        <li><a href="/" className="hover:text-blue-600">Home</a></li>
                        <li><a href="/about" className="hover:text-blue-600">About Us</a></li>
                        <li><a href="/services" className="hover:text-blue-600">Services</a></li>
                        <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
                    </ul>
                </div>

                {/* Column 3: Newsletter Signup */}
                <div className="p-4 aspect-video rounded-xl bg-muted/50">
                    <h3 className="mb-4 text-xl font-semibold">Newsletter</h3>
                    <p className="text-sm text-blue-950">
                        Subscribe to get updates and special offers.
                    </p>
                    <div className="flex mt-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 text-gray-900 rounded-l-md focus:outline-none"
                        />
                        <button className="px-4 py-2 bg-red-500 rounded-r-md hover:bg-red-600">
                            <Mail size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Full-width Section */}
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
                {/* Social Media & Payment Methods */}
                <div className="flex flex-col items-center justify-between md:flex-row">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-400"><Facebook size={24} /></a>
                            <a href="#" className="hover:text-blue-300"><Twitter size={24} /></a>
                            <a href="#" className="hover:text-pink-500"><Instagram size={24} /></a>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Payment Methods</h3>
                        <div className="flex space-x-4">
                            <CreditCard size={24} />
                            <CreditCard size={24} />
                            <CreditCard size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
