/* eslint-disable */
import React, { useState } from 'react'
import { Box, Button, Modal } from '@mui/material';
import useFetch from 'hooks/useFetch';
import { useParams } from 'react-router';

function SingleProduct() {
  const {id} = useParams()
  const {result,error,loading } = useFetch(`/products/product-detail/${id}`)
console.log(result)
const [isModalOpen, setIsModalOpen] = useState(false)
const [open, setOpen] = useState(false);
const [selectedImageIndex, setSelectedImageIndex] = useState(0);
const handleImageClick = (index) => {
  setSelectedImageIndex(index);
  setIsModalOpen(true);
};
const handleCloseModal = () => {
  setIsModalOpen(false);
};

const handleNextImage = () => {
  setSelectedImageIndex((prevIndex) =>
    prevIndex ===props.images.length - 1 ? 0 : prevIndex + 1
  );
};
const handlePrevImage = () => {
  setSelectedImageIndex((prevIndex) =>
    prevIndex === 0 ? props.images.length - 1 : prevIndex - 1
  );
};

  return (
    <Box className='searchItem' sx={{padding:"20px",backgroundColor:"#edebeb"}}>
       <Box>
        {result?.link?.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt="sadsad"
            className="searchItemImg"
            onClick={() => handleImageClick(index)}
          />
        ))}
      </Box>
      <Modal open={isModalOpen} onClose={handleCloseModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: "100vw", maxHeight: "100vh",overflow:'scroll'}}>
        <Box sx={{ maxWidth: "60%", maxHeight: "60%" }}>
        {/* <img src={result?.link[selectedImageIndex]} alt="" style={{ width:"100%",height:"500px" }}  /> */}

          <Box sx={{ display: 'flex', justifyContent: "space-between", marginTop: "20px" }}>
            <Button onClick={handlePrevImage} variant='contained'>
              Prev
            </Button>
            <Button onClick={handleNextImage} variant='contained'>
              Next
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default SingleProduct;