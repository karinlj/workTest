import { useState } from "react";

const SingleProduct = ({ product, addItem }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <article className="product_card">
      <img
        src={`/images/${product.title}.jpg`}
        alt={`Bicycle - ${product.title}`}
      />
      <div className="card_content">
        <h2>{product.title}</h2>
        <div className="card_content_inner">
          <div>
            <p className="card_description">{product.description}</p>
            <div>
              <div
                className="card_info_toggle"
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
              <ul className={`card_info_list ${showInfo ? "show" : ""}`}>
                {product &&
                  product.infoText.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
              </ul>
            </div>
          </div>
          <div>
            <p
              className={`card_amount ${
                product.discount > 0 ? "discount" : ""
              }`}
            >
              {product.amount - product.discount} : -
            </p>
            {product.discount > 0 ? (
              <p className="card_original_amount">{product.amount} : -</p>
            ) : (
              ""
            )}
          </div>
          <div className="card_btn_section">
            {" "}
            <button
              className="add_btn"
              disabled={product.disabled}
              onClick={() => addItem(product.id)}
            >
              Add to list
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SingleProduct;
