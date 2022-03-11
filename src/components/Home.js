import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import { getData } from "../fetchFunctions";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsUri = "http://localhost:9000/products/";
  const wishlistUri = "http://localhost:9000/wishlist/";

  useEffect(() => {
    const getProducts = async () => {
      const productsFromDb = await getData(productsUri);
      setProducts(productsFromDb);

      //loading & error
      setIsLoading(false);
      if (productsFromDb) {
        setError(null);
      } else {
        setError("Ooops!! Could not fetch data...");
      }
    };
    getProducts();

    const getWishlist = async () => {
      const listFromDb = await getData(wishlistUri);
      setWishlist(listFromDb);

      //loading & error
      setIsLoading(false);
      if (listFromDb) {
        setError(null);
      } else {
        setError("Ooops!! Could not fetch data...");
      }
    };
    getWishlist();
  }, []);

  return (
    <div className="home">
      <header className="header">
        <h1>Super Product List</h1>
      </header>
      {error && <div className="error">{error}</div>}
      {isLoading && <div className="loading">Loading...</div>}

      <ProductList products={products} />

      <section className="wishlist_section">
        <h2>Wishlist</h2>
        <ul>
          {wishlist &&
            wishlist.map((item, index) => {
              return (
                <li key={index}>
                  <h3> {item}</h3>
                </li>
              );
            })}
        </ul>
        <h2 className="price">
          Total Price:
          <span> 2256 :-</span>
        </h2>
      </section>
    </div>
  );
};

export default Home;
