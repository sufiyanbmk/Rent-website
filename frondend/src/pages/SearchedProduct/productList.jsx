/* eslint-disable */
import React, { forwardRef } from 'react';
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
import {
  StarIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';
import calcultateRating from '../../utils/avgRating'

const ProductList = forwardRef(({ data }, ref) => {
  const avgRating = calcultateRating(data.reviews)
  const postBody = (
    <section className='mb-20 md:p-14'>
      <div className="container mx-auto">
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14'>
          {/* card */}
          {
            data?.length === 0 ? <h1 className='md:text-center text-red-800 md:text-3xl'> No Products Are Found!</h1>
              :
              < Card className="w-full max-w-[22rem] shadow-lg" >
                <CardHeader floated={false} color="blue-gray">
                  <img
                    src={data.links[0]}
                    alt="ui/ux review check"
                  />
                  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                  <IconButton
                    size="sm"
                    color="red"
                    variant="text"
                    className="!absolute top-4 right-4 rounded-full"
                  >
                    <HeartIcon className="h-6 w-6" />
                  </IconButton>
                </CardHeader>
                <CardBody>
                  <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="font-medium">
                      {data.productName}
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="flex items-center gap-1.5 font-normal"
                    >
                      <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                      {avgRating || 0}.0
                    </Typography>
                  </div>
                  <Typography color="gray">
                    Enter a freshly updated and thoughtfully furnished peaceful home
                    surrounded by ancient trees, stone walls, and open meadows.
                  </Typography>
                </CardBody>
                <CardFooter className="pt-3">
                  <Button size="lg" fullWidth={true}>
                    <Link to={`/product-detail/${data._id}`}>View Product</Link>
                  </Button>
                </CardFooter>
              </Card>
          }
        </div>
      </div>
    </section >
  )

  const content = ref
    ? <article ref={ref}>{postBody}</article>
    : <article>{postBody}</article>

  return content
})
ProductList.displayName = 'ProductList'

export default ProductList;
