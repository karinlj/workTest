import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import { getData } from "../fetchFunctions";
import { addData } from "../fetchFunctions";
import { deleteData } from "../fetchFunctions";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsUri = "http://localhost:9000/products/";
  const wishlistUri = "http://localhost:9000/wishlist/";

  const isDisabled = (id) => {
    let matches = wishlist.filter((item) => {
      return item.id === id;
    });
    return matches.length > 0;
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
  const drawProducts = async () => {
    let tempProducts = products;

    if (!tempProducts.length) {
      tempProducts = await getData(productsUri);
    }
    //local gui state
    tempProducts = tempProducts.map((item) => {
      return { ...item, disabled: isDisabled(item.id) };
    });
    setProducts(tempProducts);
    //loading & error
    setIsLoading(false);
    if (tempProducts) {
      setError(null);
    } else {
      setError("Ooops!! Could not fetch data...");
    }
  };
  //Like componentDidMount and componentDidUpdate:
  useEffect(() => {
    getWishlist();
  }, []);

  const addItem = async (id) => {
    //find item with the id
    let addedProduct = products.find((item) => {
      return item.id === id;
    });

    //creating wishlist-item with title and amount
    const newWishlistItem = {
      id: addedProduct.id,
      title: addedProduct.title,
      amount: addedProduct.amount - addedProduct.discount,
    };
    //add data to wishlist
    await addData(wishlistUri, newWishlistItem);

    getWishlist();
  };

  const handleDelete = async (id) => {
    const deletedWishlistItem = await deleteData(wishlistUri, id);
    console.log("handleDelete", deletedWishlistItem);
    getWishlist();
    // update ui
    // let tempWishlist = wishlist.filter((item) => {
    //   return item.id !== id;
    // });
    // setWishlist(tempWishlist);
    //return deletedWishlistItem;
  };

  // const handleDelete = (id) => {
  //   //delete from db.json
  //   fetch(wishlistUri + id, { method: "DELETE" })
  //     .then(() => {
  //       //update ui
  //       let tempWishlist = wishlist.filter((item) => {
  //         return item.id !== id;
  //       });
  //       setWishlist(tempWishlist);
  //     })
  //     .catch((err) => console.log(err.message));
  // };

  useEffect(() => {
    let sum = 0;
    wishlist.forEach((item) => {
      sum += item.amount;
    });

    setTotalAmount(sum);
    console.log("wishlist", wishlist);

    drawProducts();
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

      {products.length > 0 && (
        <ProductList products={products} addItem={addItem} />
      )}

      <section className="wishlist_section">
        <h2>Wishlist</h2>
        <ul>
          {wishlist.length > 0 &&
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
