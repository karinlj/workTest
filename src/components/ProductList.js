import SingleProduct from "./SingleProduct";

const ProductList = ({ products }) => {
  return (
    <ul className="productlist">
      {products &&
        products.map((product) => {
          return <SingleProduct product={product} key={product.id} />;
        })}
    </ul>
  );
};

export default ProductList;
