const NewsletterSignup = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-teal-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">
          Stay Updated with the Latest Gardening Tips!
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Get our top gardening tips, plant care advice, and seasonal updates
          straight to your inbox. Subscribe now to join the Gardening Hub
          community!
        </p>
        <form className="mt-8 flex justify-center">
          <input
            className="w-full sm:w-80 px-4 py-2 rounded-l-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your email"
            type="email"
          />
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
