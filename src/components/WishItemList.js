const WishItemList = (wishlist, handleDelete, totalAmount) => {
  return (
    <>
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
        {<span> {totalAmount}</span>}
      </h2>
    </>
  );
};

export default WishItemList;
