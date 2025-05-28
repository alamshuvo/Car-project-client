"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const statsData = [
  { label: "CARS FOR SALE", value: 80 },
  { label: "DEALER REVIEWS", value: 73 },
  { label: "VISITORS PER DAY", value: 1000 },
  { label: "VERIFIED DEALERS", value: 200 },
];

export default function OverView() {
  const [stats, setStats] = useState(statsData.map(() => 0));
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((current, index) => {
          const target = statsData[index].value;
          const increment = Math.ceil(target / 80); // adjust speed
          return current < target
            ? Math.min(current + increment, target)
            : target;
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-[#f9fafa]">
      <div className="my-8">
        <h2 className="font-bold text-center text-red-500 mt-28">Overview</h2>
        <h3 className="mb-12 text-5xl font-bold text-center uppercase text-blue-950">
          Flexible Finance For Added Shine
        </h3>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center ">
          {/* Left - YouTube Iframe */}
          <div className="relative rounded-xl overflow-hidden aspect-video">
            <iframe
              src="https://www.youtube.com/embed/W0Dd6HxYopo"
              title="CarValley Vedic Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Right - Text */}
          <div>
            <p className="text-gray-600 mb-6">
              A Car Finance allows you to get a quote without affecting your
              credit rating. Find a car from any dealer, and we’ll do the rest.
              With a large panel of 30+ lenders, we can help most drivers.
            </p>
            <Link to={"/products"}>
              <Button className="flex items-center gap-2">
                Find Out More <ArrowUpRight size={18} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-20 px-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index}>
              <h3 className="text-2xl lg:text-4xl font-bold text-gray-900 ">
                {stat.toLocaleString()} {/* shows commas */}
              </h3>
              <p className="text-sm text-gray-500">{statsData[index].label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
