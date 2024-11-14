import Image from "next/image";
import Link from "next/link";

const Advertisement = () => {
  return (
    <div className="relative max-w-[80%] mx-auto my-20 h-[250px] overflow-hidden">
      <Image
        alt="Magazine and blog themes"
        className="brightness-50"
        layout="fill"
        objectFit="cover"
        src="https://img.freepik.com/free-photo/top-view-books-arrangement_23-2148882754.jpg?w=1380&t=st=1701705862~exp=1701706462~hmac=f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12">
        <p className="text-gray-300 text-sm mb-2">- Advertisement -</p>
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2">
          Best Selling BLOG and MAGAZINE
          <br />
          Theme of All Time
        </h2>
        <p className="text-cyan-400 text-lg sm:text-xl font-semibold mb-4">
          Experience the change!
        </p>
        <Link
          className="bg-transparent hover:bg-white text-white hover:text-black border border-white font-bold py-2 px-4 rounded inline-block transition-colors duration-300 ease-in-out w-max"
          href="/buy-now"
        >
          BUY NOW →
        </Link>
      </div>
    </div>
  );
};

export default Advertisement;
