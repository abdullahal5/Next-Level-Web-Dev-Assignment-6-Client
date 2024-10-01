"use client";
import Image from "next/image";

import GHForm from "../../form/GHForm";
import GHInput from "../../form/GHInput";

const TopNews = () => {
  const onsubmit = () => {};

  return (
    <>
      <div className="lg:w-1/2 md:w-1/2 mx-auto my-5">
        <GHForm onSubmit={onsubmit}>
          <GHInput label="Search" name="search" type="search" />
        </GHForm>
      </div>
      <div className="mb-5 grid grid-cols-1 md:grid-cols-12 gap-5">
        <h1 className="col-span-12 text-2xl md:text-3xl font-semibold">
          Top News
        </h1>

        <div className="col-span-12 md:col-span-8 relative">
          <Image
            alt="Image"
            className="rounded-lg object-cover w-full"
            height={600}
            src={
              "https://i.ibb.co.com/4ZWb81n/plants-pot-with-watering-can.jpg"
            }
            width={600}
          />
          <div className="absolute bottom-1.5 left-0 w-full rounded-b-lg bg-black bg-opacity-70 text-white p-3">
            <h1 className="text-lg md:text-xl font-bold">Headline Text</h1>
            <p className="text-xs md:text-sm">
              This is a short description under the headline.
            </p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 gap-5 flex flex-col">
          <div className="relative">
            <Image
              alt="Image"
              className="rounded-lg object-cover w-full"
              height={300}
              src={
                "https://i.ibb.co.com/YLs703q/young-chic-female-gardener-taking-care-plants-backyard-earning-money-pursue-her-travel-dream-young-e.jpg"
              }
              width={300}
            />
            <div className="absolute bottom-0 rounded-b-lg left-0 w-full bg-black bg-opacity-70 text-white p-2">
              <h1 className="text-base md:text-lg font-semibold">
                Image Title
              </h1>
              <p className="text-xs">Description or caption for the image.</p>
            </div>
          </div>

          <div className="relative">
            <Image
              alt="Image"
              className="rounded-lg object-cover w-full"
              height={300}
              src={
                "https://i.ibb.co.com/K0GjNcB/close-up-man-watering-plants-with-sprinkler.jpg"
              }
              width={300}
            />
            <div className="absolute bottom-0 rounded-b-lg left-0 w-full bg-black bg-opacity-70 text-white p-2">
              <h1 className="text-base md:text-lg font-semibold">
                Another Title
              </h1>
              <p className="text-xs">Another image description here.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNews;
