//This componement is used to return one product information

const Product = ({ price, productId, imageSrc, category }) => {
 return (
    <>
      <p>Category: {category} </p>
      <img src={imageSrc} alt={productId} />
      <p>Price: {price}</p>
    </>
  );
};

export default Product;
