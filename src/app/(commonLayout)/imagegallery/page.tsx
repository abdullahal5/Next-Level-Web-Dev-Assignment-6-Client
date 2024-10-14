/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/img-redundant-alt */
"use client";
import dynamic from "next/dynamic";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NoSSRImageGallery = dynamic(() => import("react-responsive-masonry"), {
  ssr: false,
});

const images: string[] = [
  "https://img.freepik.com/free-photo/plants-pot-with-watering-can_23-2148905231.jpg?ga=GA1.1.196076015.1725610901&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/overhead-view-hand-holding-small-fresh-potted-plant_23-2147844319.jpg?t=st=1728461536~exp=1728465136~hmac=4cfe5ea48502e6ac4e9abbf7d6c0a9aa54cdb9e11cf1881b1fa2ae59f682a953&w=826",
  "https://img.freepik.com/free-photo/close-up-man-watering-plants-with-sprinkler_23-2148396764.jpg?t=st=1728461555~exp=1728465155~hmac=603dda8ad3eba3c433bf3513727772fcce215d1d0eee1a8d533c9149c8758dcc&w=900",
  "https://img.freepik.com/premium-photo/gardener-is-planting-flower-garden_73944-16777.jpg?w=1380",
  "https://img.freepik.com/free-photo/male-female-gardener-s-hand-wearing-gloves-planting-seedling_23-2148165360.jpg?t=st=1728461600~exp=1728465200~hmac=d9a44a906b0e1998cbb61a9c08693eee4557abe46ec76445275c049013fb32b1&w=740",
  "https://img.freepik.com/premium-photo/interpreter-standing-with-gardening-trowel-pla-0_975681-159610.jpg?w=826",
  "https://img.freepik.com/free-photo/senior-couple-caring-flowers_23-2148256693.jpg?t=st=1728461630~exp=1728465230~hmac=9bdcc2b0dce03aafd050e82334a4a77005f4c250c5c2387715880a78b2ed9dd8&w=826",
  "https://img.freepik.com/free-photo/plants-gardening-tools-close-up_23-2148905246.jpg?t=st=1728459090~exp=1728462690~hmac=6a8e1e431ee37066809a98ffb91e2254e118008ad9c90e2e69a7aa4a4a5d70c0&w=740",
  "https://img.freepik.com/free-photo/close-up-couple-watering-flowers_23-2148256655.jpg?ga=GA1.1.196076015.1725610901&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/beautiful-woman-summer-field_1157-24261.jpg?ga=GA1.1.196076015.1725610901&semt=ais_hybrid",
  "https://img.freepik.com/premium-photo/two-women-working-garden-with-flowers-planter_1220218-27403.jpg?ga=GA1.1.196076015.1725610901&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/young-male-gardener-holding-crate-with-vivid-potted-plants-garden_23-2147844282.jpg?ga=GA1.1.196076015.1725610901&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/top-view-gardening-tools-ground_23-2148200479.jpg?t=st=1728461757~exp=1728465357~hmac=354c9d5cf23ebc21c3e6835bb2b1921392932bddb3e557a4440807a09e060f24&w=900",
  "https://img.freepik.com/free-photo/plants-gardening-tools-close-up_23-2148905235.jpg?t=st=1728461788~exp=1728465388~hmac=31eb628a53cbd730381767bc86417fb57f69e890417cf471054683edaec548ba&w=996",
  "https://img.freepik.com/free-photo/gardening-concept-with-shovels-hands-holding-seeds_23-2147673252.jpg?t=st=1728461811~exp=1728465411~hmac=011320d4bdcdde01f579d782ec371a6dd6bb09e64de9480302358cc515c1b7a9&w=900",
  "https://img.freepik.com/free-photo/plants-pot-with-watering-can_23-2148905231.jpg?ga=GA1.1.196076015.1725610901&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/overhead-view-hand-holding-small-fresh-potted-plant_23-2147844319.jpg?t=st=1728461536~exp=1728465136~hmac=4cfe5ea48502e6ac4e9abbf7d6c0a9aa54cdb9e11cf1881b1fa2ae59f682a953&w=826",
  "https://img.freepik.com/free-photo/close-up-man-watering-plants-with-sprinkler_23-2148396764.jpg?t=st=1728461555~exp=1728465155~hmac=603dda8ad3eba3c433bf3513727772fcce215d1d0eee1a8d533c9149c8758dcc&w=900",
  "https://img.freepik.com/premium-photo/gardener-is-planting-flower-garden_73944-16777.jpg?w=1380",
  "https://img.freepik.com/free-photo/male-female-gardener-s-hand-wearing-gloves-planting-seedling_23-2148165360.jpg?t=st=1728461600~exp=1728465200~hmac=d9a44a906b0e1998cbb61a9c08693eee4557abe46ec76445275c049013fb32b1&w=740",
  "https://img.freepik.com/premium-photo/interpreter-standing-with-gardening-trowel-pla-0_975681-159610.jpg?w=826",
  "https://img.freepik.com/free-photo/senior-couple-caring-flowers_23-2148256693.jpg?t=st=1728461630~exp=1728465230~hmac=9bdcc2b0dce03aafd050e82334a4a77005f4c250c5c2387715880a78b2ed9dd8&w=826",
  "https://img.freepik.com/free-photo/plants-gardening-tools-close-up_23-2148905246.jpg?t=st=1728459090~exp=1728462690~hmac=6a8e1e431ee37066809a98ffb91e2254e118008ad9c90e2e69a7aa4a4a5d70c0&w=740",
  "https://img.freepik.com/free-photo/close-up-couple-watering-flowers_23-2148256655.jpg?ga=GA1.1.196076015.1725610901&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/beautiful-woman-summer-field_1157-24261.jpg?ga=GA1.1.196076015.1725610901&semt=ais_hybrid",
  "https://img.freepik.com/premium-photo/two-women-working-garden-with-flowers-planter_1220218-27403.jpg?ga=GA1.1.196076015.1725610901&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/young-male-gardener-holding-crate-with-vivid-potted-plants-garden_23-2147844282.jpg?ga=GA1.1.196076015.1725610901&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/top-view-gardening-tools-ground_23-2148200479.jpg?t=st=1728461757~exp=1728465357~hmac=354c9d5cf23ebc21c3e6835bb2b1921392932bddb3e557a4440807a09e060f24&w=900",
  "https://img.freepik.com/free-photo/plants-gardening-tools-close-up_23-2148905235.jpg?t=st=1728461788~exp=1728465388~hmac=31eb628a53cbd730381767bc86417fb57f69e890417cf471054683edaec548ba&w=996",
  "https://img.freepik.com/free-photo/gardening-concept-with-shovels-hands-holding-seeds_23-2147673252.jpg?t=st=1728461811~exp=1728465411~hmac=011320d4bdcdde01f579d782ec371a6dd6bb09e64de9480302358cc515c1b7a9&w=900",
];

const ImageGallery = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openModal = (image: string, i: number) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const showNextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;

    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const showPrevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;

    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="w-full">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="10px">
          {images.map((image, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-md cursor-pointer"
              onClick={() => openModal(image, i)}
            >
              <img
                alt={`Gallery Image ${i + 1}`}
                className="w-full transition-transform duration-300 ease-in-out transform hover:scale-105"
                src={image}
                style={{ display: "block" }}
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {selectedImage && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              alt="Selected"
              className="max-w-full max-h-screen"
              src={selectedImage}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>

            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-gray-800 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                showPrevImage();
              }}
            >
              &#8249;
            </button>

            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-gray-800 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
            >
              &#8250;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
