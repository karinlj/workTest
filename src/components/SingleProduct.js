import { useState } from "react";

const SingleProduct = ({ product }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <li className="product_card">
      <article>
        <div className="image">Image</div>
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
            <h2>{product.price} : -</h2>
            <footer className="btn_section">
              {" "}
              <button className="add_btn">Add to list</button>
            </footer>
          </div>
        </div>
      </article>
    </li>
  );
};

export default SingleProduct;
