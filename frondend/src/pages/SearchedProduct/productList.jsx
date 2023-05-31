/* eslint-disable */
import React, { forwardRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import calcultateRating from "../../utils/avgRating";

const ProductList = forwardRef(({ data }, ref) => {
  const avgRating = calcultateRating(data.reviews);
  const postBody = (
    <section className="py-8">
      <div className="container mx-auto">
        <div className="">
          {/* card */}
          {data?.length === 0 ? (
            <h1 className="text-red-800 text-center text-3xl">
              No products found!
            </h1>
          ) : (
            <div className="w-full max-w-[26rem] rounded-lg overflow-hidden shadow-lg flex flex-col">
              <div className="relative flex-shrink-0 h-52 overflow-hidden">
                <img
                  src={data.link[0]}
                  alt="Product Image"
                  className="w-full h-full object-cover object-center transition duration-300 transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                <IconButton
                  size="sm"
                  color="red"
                  variant="text"
                  className="absolute top-4 right-4 rounded-full"
                >
                  <HeartIcon className="h-6 w-6" />
                </IconButton>
              </div>
              <div className="flex-grow p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-semibold text-gray-800 uppercase">
                    {data.productName}
                  </h2>
                  {data?.featured.length >= 1 && (
                    <span className="badge badge-lg">FEATURED</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="text-gray-600 text-lg">
                      {avgRating || 0}.0
                    </span>
                  </div>
                  <p className="text-gray-700">{data.description}</p>
                </div>
                <div className="mt-4">
                  <Button size="lg" fullWidth={true}>
                    <Link
                      to={`/product-detail/${data._id}`}
                      className="text-white"
                    >
                      View Product
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );

  const content = ref ? (
    <article ref={ref}>{postBody}</article>
  ) : (
    <article>{postBody}</article>
  );

  return content;
});
ProductList.displayName = "ProductList";

export default ProductList;
