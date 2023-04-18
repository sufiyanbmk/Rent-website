const Rating = (reviews) => {
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  const ratingOutOfFive = Math.round(averageRating * 2) / 2; // round to nearest half-star
  return ratingOutOfFive;
};

export default Rating;
