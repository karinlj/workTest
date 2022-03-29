import SingleProduct from "./SingleProduct";

const ProductList = ({ products, addItem }) => {
  return (
    <section className="product_list_section">
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
    </section>
  );
};

export default ProductList;
