import Image from "next/image";
import { FaLeaf, FaSeedling, FaTree } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[hsl(var(--nextui-content1)/var(--nextui-content1-opacity,var(--tw-bg-opacity)))] text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
          About Gardening HUB
        </h1>

        <div className="bg-background rounded-lg shadow-lg overflow-hidden mb-8 border border-divider">
          <Image
            alt="Gardening Paradise"
            className="w-full h-64 object-cover"
            height={300}
            src="https://i.ibb.co.com/Xyx9Pjt/senior-woman-watering-crops.jpg"
            width={800}
          />
          <div className="p-6">
            <p className="text-foreground-600 mb-4">
              Welcome to Gardening Paradise, your oasis for all things green and
              growing. We&apos;re passionate about helping people cultivate
              beauty in their own backyards and beyond.
            </p>
            <p className="text-foreground-600">
              Founded in 2010, we&apos;ve grown from a small blog to a thriving
              community of garden enthusiasts. Our mission is to inspire and
              educate people about the joys of gardening and sustainable living.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              description: "Learn eco-friendly gardening techniques and tips.",
            },
            {
              icon: FaTree,
              title: "Community Growth",
              description:
                "Join our community and grow alongside fellow enthusiasts.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-background rounded-lg shadow p-6 text-center border border-divider"
            >
              <item.icon className="text-4xl text-green-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-green-400-600 mb-2">
                {item.title}
              </h2>
              <p className="text-foreground-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Join Our Community
          </h2>
          <p className="text-foreground-600 mb-6">
            Stay updated with our latest gardening tips and events!
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              className="px-4 py-2 bg-background text-foreground border border-divider rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-green-400"
              placeholder="Enter your email"
              type="email"
            />
            <button
              className="px-6 py-2 bg-green-400 text-green-800 font-semibold rounded-md hover:text-green-600 transition duration-300"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
