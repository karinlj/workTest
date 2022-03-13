import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import { getData } from "../fetchFunctions";
import { addData } from "../fetchFunctions";
import { updateData } from "../fetchFunctions";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsUri = "http://localhost:9000/products/";
  const wishlistUri = "http://localhost:9000/wishlist/";

  const getProducts = async () => {
    const productsFromDb = await getData(productsUri);

    //local gui state
    // let tempProducts = productsFromDb.map((item) => {
    //   return { ...item, enabled: isDisabled };
    // });
    // console.log("temp", tempProducts);
    // setProducts(tempProducts);

    setProducts(productsFromDb);
    //loading & error
    setIsLoading(false);
    if (productsFromDb) {
      setError(null);
    } else {
      setError("Ooops!! Could not fetch data...");
    }
  };
  const getWishlist = async () => {
    const listFromDb = await getData(wishlistUri);
    setWishlist(listFromDb);
    setIsLoading(false);
    if (listFromDb) {
      setError(null);
    } else {
      setError("Ooops!! Could not fetch data...");
    }
  };

  // const isDisabled = (id) => {
  //   let matches = wishlist.filter((item) => {
  //     return item.id === id;
  //   });
  //   return matches.length > 0;
  // };

  //Like componentDidMount and componentDidUpdate:
  useEffect(() => {
    getProducts();
    getWishlist();
  }, []);

  const addItem = async (id) => {
    //find item with the id
    let addedProduct = products.find((item) => {
      return item.id === id;
    });

    // const updProduct = {
    //   ...addedProduct,
    //   isDisabled: true,
    // };
    // //PUT request...send update
    // const serverProducts = await updateData(productsUri + id, updProduct);
    // console.log("serverProducts", serverProducts);
    // setProducts(
    //   products.map((item) => {
    //     return item.id === id
    //       ? { ...item, isDisabled: serverProducts.isDisabled }
    //       : item;
    //   })
    // );

    //creating wishlist-item with title and amount
    const newWishlistItem = {
      id: addedProduct.id,
      title: addedProduct.title,
      amount: addedProduct.amount,
    };
    //add data to wishlist
    await addData(wishlistUri, newWishlistItem);

    getWishlist();
  };

  useEffect(() => {
    let sum = 0;
    wishlist.forEach((item) => {
      sum += item.amount;
    });

    setTotalAmount(sum);
    //console.log("wishlist", wishlist);
  }, [wishlist]);

  useEffect(() => {
    console.log("products", products);
  }, [products]);

  return (
    <div className="home">
      <header className="header">
        <h1>Super Product List</h1>
      </header>
      {error && <div className="error">{error}</div>}
      {isLoading && <div className="loading">Loading...</div>}

      {products.length && <ProductList products={products} addItem={addItem} />}

      <section className="wishlist_section">
        <h2>Wishlist</h2>
        <ul>
          {wishlist.length > 0 &&
            wishlist.map((item, index) => {
              return (
                <li key={index}>
                  <h3> {item.title}</h3>
                </li>
              );
            })}
        </ul>
        <h2 className="price">
          Total Price:
          <span> {totalAmount}</span>
        </h2>
      </section>
    </div>
  );
};

export default Home;
