import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [category, setcategory] = useState({});
  const navigate = useNavigate();   

  useEffect(() => {
    if (params?.slug) getProductBycategory();
  }, [params?.slug]);

  const getProductBycategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/product-category/${params.slug}`
      );
      setProduct(data?.products);
      setcategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{product?.length} products found</h6>
        <div className="d-flex flex-wrap">
          {product.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
              <img
                src={`/api/v1/products/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}</p>
                <p className="card-text">$ {p.price}</p>
                <button
                  className="btn btn-primary m-lg-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Detail
                </button>
                <button className="btn btn-secondary">🛒 Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="m-2 p-3">
          {product && product.length < total && (
            <button
              className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading....!" : "Load More"}
            </button>
          )}
        </div> */}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
