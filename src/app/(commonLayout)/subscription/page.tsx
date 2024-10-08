import SubscriptionCard from "@/src/components/UI/SubscriptionCard";

const SubscriptionPage = () => {
  const subscriptionPlans = [
    {
      title: "Basic Plan",
      price: "299",
      features: ["Access to basic features", "Email support", "1 user license"],
      expiry: "1 Day",
    },
    {
      title: "Standard Plan",
      price: "699",
      features: [
        "All Basic Plan features",
        "Priority email support",
        "5 user licenses",
        "Access to premium content",
      ],
      expiry: "7 Days",
      recommended: true,
    },
    {
      title: "Premium Plan",
      price: "999",
      features: [
        "All Standard Plan features",
        "24/7 customer support",
        "Unlimited user licenses",
        "Access to exclusive features",
        "Free updates for 1 year",
      ],
      expiry: "1 Month",
    },
  ];

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Choose Your Subscription Plan
      </h1>
      <div className="flex flex-col lg:flex-row justify-center gap-6 max-w-4xl mx-auto pt-5">
        {subscriptionPlans.map((plan, index) => (
          <SubscriptionCard
            key={index}
            expiry={plan.expiry}
            features={plan.features}
            isMiddle={index === 1}
            price={plan.price}
            title={plan.title}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
