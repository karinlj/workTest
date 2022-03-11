import { useState } from "react";

const ProductList = ({ products }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <ul className="productlist">
      {products.map((item) => {
        return (
          <li className="product_card" key={item.id}>
            <article>
              <div className="image">Image</div>
              <div className="card_content">
                <header>
                  <h2>{item.title}</h2>
                </header>
                <div className="card_content_inner">
                  <div className="text">
                    <p className="description">{item.description}</p>
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
                        {item.infoText.map((item, index) => {
                          return <li key={index}>{item}</li>;
                        })}
                      </ul>
                    </div>
                  </div>
                  <h2>{item.price} : -</h2>
                  <footer className="btn_section">
                    {" "}
                    <button className="add_btn">Add to list</button>
                  </footer>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductList;
