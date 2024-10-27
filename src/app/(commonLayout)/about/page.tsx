"use client";

import { useState } from "react";
import Image from "next/image";
import { FaLeaf, FaSeedling, FaTree, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";

const AboutPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { name: "Sarah Johnson", text: "Gardening HUB transformed my backyard into a thriving oasis. The community support is incredible!" },
    { name: "Mike Thompson", text: "As a beginner, I found all the resources I needed to start my gardening journey. Highly recommended!" },
    { name: "Emily Chen", text: "The sustainable gardening tips have not only improved my garden but also reduced my environmental impact." },
  ];

  const milestones = [
    { year: 2010, event: "Gardening HUB founded" },
    { year: 2015, event: "Launched online courses" },
    { year: 2018, event: "Reached 100,000 community members" },
    { year: 2020, event: "Introduced AI-powered plant identification tool" },
    { year: 2023, event: "Expanded to international markets" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-black text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-8"
        >
          About Gardening HUB
        </motion.h1>

        <Card className="mb-12 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardBody className="p-0">
            <Image
              alt="Gardening Paradise"
              className="w-full h-80 object-cover rounded-t-xl"
              height={400}
              src="https://i.ibb.co.com/Xyx9Pjt/senior-woman-watering-crops.jpg"
              width={800}
            />
            <div className="p-8">
              <p className="text-foreground-600 mb-4 text-lg">
                Welcome to Gardening Paradise, your oasis for all things green
                and growing. We&apos;re passionate about helping people
                cultivate beauty in their own backyards and beyond.
              </p>
              <p className="text-foreground-600 text-lg">
                Founded in 2010, we&apos;ve grown from a small blog to a
                thriving community of garden enthusiasts. Our mission is to
                inspire and educate people about the joys of gardening and
                sustainable living.
              </p>
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: FaSeedling,
              title: "Beginners Welcome",
              description:
                "New to gardening? We have resources for every skill level.",
            },
            {
              icon: FaLeaf,
              title: "Sustainable Practices",
              description:
                "Learn eco-friendly gardening techniques and tips.",
            },
            {
              icon: FaTree,
              title: "Community Growth",
              description:
                "Join our community and grow alongside fellow enthusiasts.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardBody className="text-center p-6">
                  <item.icon className="text-5xl text-green-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h2>
                  <p className="text-foreground-600">{item.description}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="mb-12 shadow-xl">
          <CardBody className="p-8">
            <h2 className="text-3xl font-semibold text-center mb-6">Our Journey</h2>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-24 text-right mr-4 font-bold text-green-500">{milestone.year}</div>
                  <div className="flex-grow">
                    <Progress value={(index + 1) * 20} className="mb-2" />
                    <p>{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="mb-12 shadow-xl">
          <CardBody className="p-8">
            <h2 className="text-3xl font-semibold text-center mb-6">What Our Community Says</h2>
            <div className="relative">
              <FaQuoteLeft className="text-4xl text-green-400 mb-4" />
              <p className="text-lg mb-4">{testimonials[currentTestimonial].text}</p>
              <p className="font-semibold text-right">- {testimonials[currentTestimonial].name}</p>
              <div className="flex justify-between mt-4">
                <Button
                  isIconOnly
                  aria-labelledby="Previous testimonial"
                  onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                >
                  <FaChevronLeft />
                </Button>
                <Button
                  isIconOnly
                  aria-labelledby="Next testimonial"
                  onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                >
                  <FaChevronRight />
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="text-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardBody className="p-8">
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              Join Our Community
            </h2>
            <p className="text-foreground-600 mb-6 text-lg">
              Stay updated with our latest gardening tips and events!
            </p>
            <form className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                className="px-4 py-2 bg-background text-foreground border border-divider rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 w-full sm:w-auto"
                placeholder="Enter your email"
                type="email"
              />
              <Button
                color="success"
                size="lg"
                className="w-full sm:w-auto"
              >
                Subscribe
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;