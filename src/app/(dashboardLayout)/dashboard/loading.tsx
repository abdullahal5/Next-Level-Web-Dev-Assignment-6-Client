import { Spinner } from "@nextui-org/spinner";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Spinner size="lg" />
    </div>
  );
};

export default LoadingPage;
