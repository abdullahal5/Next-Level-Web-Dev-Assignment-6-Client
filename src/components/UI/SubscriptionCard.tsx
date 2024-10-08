"use client";
import { FaCheckCircle } from "react-icons/fa";

import { useCreatePaymentMutation } from "@/src/redux/features/payment/paymentApi";
import { useAppSelector } from "@/src/redux/hook";

interface SubscriptionCardProps {
  title: string;
  price: string;
  features: string[];
  isMiddle: boolean;
  expiry: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  features,
  isMiddle,
  expiry,
}) => {
  const [createPayment] = useCreatePaymentMutation();
  const { user } = useAppSelector((state) => state.auth);

  const handlePayment = async () => {
    const subscriptionData = {
      user: user?.userId,
      title,
      price,
      expiry,
    };

    const res = await createPayment(subscriptionData);

    if (res) {
      window.location.href = res.data.data.payment_url;
    }
  };

  return (
    <div
      className={`transition-transform duration-300 ease-in-out p-8 rounded-lg shadow-2xl bg-white dark:bg-gray-800 
                   ${isMiddle ? "scale-110" : "scale-100"} hover:scale-105 transform hover:shadow-lg 
                   w-full sm:w-72 md:w-80 lg:w-96 flex flex-col`}
    >
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">
        {title}
      </h2>
      <p className="text-3xl md:text-4xl font-extrabold text-center mb-1 text-blue-600 dark:text-blue-400">
        ${price}
      </p>
      {isMiddle && (
        <span className="block text-center border rounded-md text-white text-xs font-bold py-1 px-2 mb-4">
          Recommended
        </span>
      )}
      <p className="text-center mb-4 text-gray-600 dark:text-gray-300">
        Duration: {expiry}
      </p>
      <ul className="list-disc list-inside mb-4 flex-grow flex flex-col justify-center space-y-2">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center text-gray-700 dark:text-gray-300"
          >
            <FaCheckCircle className="text-green-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <button
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        onClick={handlePayment}
      >
        Subscribe
      </button>
      <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
        Best Value
      </p>
    </div>
  );
};

export default SubscriptionCard;
