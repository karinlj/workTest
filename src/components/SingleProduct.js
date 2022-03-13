import { useState } from "react";

const SingleProduct = ({ product, addItem }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <li className="product_card">
      <article>
        <div className="image">
          {/* <img
            src={require(`../images/${product.title}.jpg`).default}
            alt="bike"
          />{" "} */}
          {/* <img src={require(`../images/photo.jpg`).default} alt="bike" />{" "} */}

          <img src={`/images/${product.title}.jpg`} alt="bike" />
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
                  <i className="fas fa-chevron-down arrow"></i>
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
            <h2>{product.amount} : -</h2>
            <footer className="btn_section">
              {" "}
              <button
                className="add_btn"
                //disabled={!product.enabled}
                disabled={product.isDisabled}
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
