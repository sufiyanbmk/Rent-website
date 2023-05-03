/* eslint-disable */
import React, { useState, useEffect } from "react";
import useFetch from "hooks/useFetch";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Rating,
  useMediaQuery,
  Collapse
} from "@mui/material";
import Header from "../../component/Headers";
import { Link } from 'react-router-dom'
import calcultateRating from '../../utils/avgRating';

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [data, setData] = useState([]);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: "#fcfcfc",
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="#4cceac"
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color="#3da58a">
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button  component={Link} to={`/single-product/${_id}`} sx={{ textDecoration: 'none' }}>
          See More
        </Button>
      </CardActions>
      {/* <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        // sx={{
        //   color: theme.palette.neutral[300],
        // }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
};

const Products = () => {
  const { result, error, loading } = useFetch('/products')
  console.log(result)
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {result || !loading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {result.map(
            ({
              _id,
              productName,
              address2,
              price,
              reviews,
              category,
              description,
              supply,
              stat,
            }) => {
              const avgRating = calcultateRating(reviews);
              return (
                <Product
                  key={_id}
                  _id={_id}
                  name={productName}
                  description={description}
                  price={price}
                  rating={avgRating}
                  category={category}
                  supply={supply}
                  stat={stat}
                />
              );
            }
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;