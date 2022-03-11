import ProductList from "./ProductList";
//import { useState, useEffect } from "react";

const Home = () => {
  const products = [
    {
      id: 1,
      title: "Super Product 1",
      description: "Some text for this super product that all want to buy...",
      infoText: ["info one", "info two", "info three"],
      price: 100,
    },
    {
      id: 2,
      title: "Super Product 34",
      description: "Some text for this super product that all want to buy...",
      infoText: ["info one", "info two", "info three"],
      price: 800,
    },
    {
      id: 3,
      title: "Super Product 39",
      description: "Some text for this super product that all want to buy...",
      infoText: ["info one", "info two", "info three"],
      price: 1050,
    },
    {
      id: 4,
      title: "Super Product 56",
      description: "Some text for this super product that all want to buy...",
      infoText: ["info one", "info two", "info three"],
      price: 500,
    },
    {
      id: 5,
      title: "Super Product 77",
      description: "Some text for this super product that all want to buy...",
      infoText: ["info one", "info two", "info three"],
      price: 1700,
    },
    {
      id: 6,
      title: "Super Product 99",
      description: "Some text for this super product that all want to buy...",
      infoText: ["info one", "info two", "info three"],
      price: 2000,
    },
  ];

  return (
    <div className="home">
      <header className="header">
        <h1>Super Product List</h1>
      </header>

      <ProductList products={products} />
    </div>
  );
};

export default Home;
