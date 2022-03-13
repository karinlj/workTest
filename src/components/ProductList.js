import SingleProduct from "./SingleProduct";

const ProductList = ({ products, addItem }) => {
  return (
    <ul className="productlist">
      {products &&
        products.map((product) => {
          return (
            <SingleProduct
              product={product}
              addItem={addItem}
              key={product.id}
            />
          );
        })}
    </ul>
  );
};

export default ProductList;
