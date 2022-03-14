import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import { getData } from "../fetchFunctions";
import { addData } from "../fetchFunctions";
import { deleteData } from "../fetchFunctions";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productsLoading, setproductsLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [wishlistError, setWishlistError] = useState(null);
  const [productsError, setProductsError] = useState(null);

  const productsUri = "http://localhost:9000/products/";
  const wishlistUri = "http://localhost:9000/wishlist/";

  const getWishlist = async () => {
    //get wishlist
    const dbWishlist = await getData(wishlistUri);
    setWishlist(dbWishlist);
    setWishlistLoading(false);
    if (dbWishlist) {
      setWishlistError(null);
    } else {
      setWishlistError("Endpoint error: Could not fetch data...");
    }
  };

  //disable buttons
  const isDisabled = (id) => {
    if (wishlist) {
      let matches = wishlist.filter((item) => {
        return item.id === id;
      });
      return matches.length > 0;
    }
  };

  const drawProducts = async () => {
    let tempProducts = products;
    if (!tempProducts) {
      //get products
      tempProducts = await getData(productsUri);
    }
    //extending state for gui
    tempProducts =
      tempProducts &&
      tempProducts.map((item) => {
        return { ...item, disabled: isDisabled(item.id) };
      });
    setProducts(tempProducts);
    setproductsLoading(false);
    if (tempProducts) {
      setProductsError(null);
    } else {
      setProductsError("Endpoint error: Could not fetch data...");
    }
  };

  //add wishlist item
  const addItem = async (id) => {
    let addedProduct = products.find((item) => {
      return item.id === id;
    });
    //new wishlist object
    const newWishlistItem = {
      id: addedProduct.id,
      title: addedProduct.title,
      amount: addedProduct.amount - addedProduct.discount,
    };
    //add data
    await addData(wishlistUri, newWishlistItem);
    //get wishlist after added item
    getWishlist();
  };

  //delete wishlist item
  const handleDelete = async (id) => {
    //detete data
    await deleteData(wishlistUri, id);
    //get wishlist after deleted item
    getWishlist();
  };
  useEffect(() => {
    //get wishlist on load
    getWishlist();
  }, []);

  useEffect(() => {
    //add amounts
    let sum = 0;
    wishlist &&
      wishlist.forEach((item) => {
        sum += item.amount;
      });
    setTotalAmount(sum);
    //get products depending on wishlist
    drawProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist]);

  return (
    <div className="home">
      <header className="header">
        <h1>Super Product List</h1>
      </header>
      {productsError && <div className="error">{productsError}</div>}
      {productsLoading && <div className="loading">Products loading...</div>}
      {products && <ProductList products={products} addItem={addItem} />}

      <section className="wishlist_section">
        <h2>Wishlist</h2>
        {wishlistError && <div className="error">{wishlistError}</div>}
        {wishlistLoading && <div className="loading">Wishlist loading...</div>}

        <ul>
          {wishlist &&
            wishlist.map((item, index) => {
              return (
                <li key={index}>
                  <h3>
                    {" "}
                    {item.title}{" "}
                    <span
                      className="delete"
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  </h3>
                </li>
              );
            })}
        </ul>
        <h2 className="price">
          Total Price:
          {wishlist && <span> {totalAmount}</span>}
        </h2>
      </section>
    </div>
  );
};

export default Home;
