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
} from "@mui/material";
import Header from "../../component/Headers";
import { Link } from 'react-router-dom'

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
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      {/* <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
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
  const {data} = useFetch(
    'http://localhost:8000/admin/products'
  )
  console.log(data)
  console.log(data.loading)
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {data || !data.loading ? (
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
          {data.map(
            ({
              _id,
              name,
              address2,
              price,
              rating,
              lastName,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={address2}
                price={price}
                rating={rating}
                category={lastName}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;