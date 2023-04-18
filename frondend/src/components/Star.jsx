/* eslint-disable */
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="text-orange-500 text-2xl" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="text-orange-500 text-2xl" />
        ) : (
          <AiOutlineStar className="text-gray-500 text-2xl" />
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center">
      <div className="flex gap-1 items-center">
        {ratingStar}
        <p className="text-gray-500 text-sm">({reviews} customer reviews)</p>
      </div>
    </div>
  );
};

export default Star;