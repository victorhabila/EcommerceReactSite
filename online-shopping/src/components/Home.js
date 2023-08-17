import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux"; // to get data from my state
import { useGetAllProductsQuery } from "../features/productsApi";
import { addToCart } from "../features/cartSlice";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();

  const dispatch = useDispatch(); //initializing action dispatcher
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // this will add or push our product to cart state
    navigate("/cart");
  };

  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading spinner...</p>
      ) : error ? (
        <p>An error occured..</p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          {
            <div className="products">
              {data?.map((product) => (
                <div key={product.id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />

                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          }
        </>
      )}
    </div>
  );
};

export default Home;
