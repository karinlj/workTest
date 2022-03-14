import { useState } from "react";

const SingleProduct = ({ product, addItem }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <li className="product_card">
      <article>
        <div className="image">
          <img src={`/images/${product.title}.jpg`} alt="bicycle" />
        </div>
        <div className="card_content">
          <header>
            <h2>{product.title}</h2>
          </header>
          <div className="card_content_inner">
            <div className="text">
              <p className="description">{product.description}</p>
              <div>
                <div
                  className="see_info_toggle"
                  onClick={() => {
                    setShowInfo(!showInfo);
                  }}
                >
                  {!showInfo ? (
                    <i className="fas fa-chevron-down arrow"></i>
                  ) : (
                    <i className="fas fa-chevron-up arrow"></i>
                  )}
                  <span>See information</span>
                </div>
                <ul className={`info_list ${showInfo ? "show" : ""}`}>
                  {product &&
                    product.infoText.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                </ul>
              </div>
            </div>
            <div className="price">
              <h2
                className={`amount ${product.discount > 0 ? "discount" : ""}`}
              >
                {product.amount - product.discount} : -
              </h2>
              {product.discount > 0 ? (
                <h3 className="original_amount">{product.amount} : -</h3>
              ) : (
                ""
              )}
            </div>
            <footer className="btn_section">
              {" "}
              <button
                className="add_btn"
                disabled={product.disabled}
                onClick={() => addItem(product.id)}
              >
                Add to list
              </button>
            </footer>
          </div>
        </div>
      </article>
    </li>
  );
};

export default SingleProduct;
