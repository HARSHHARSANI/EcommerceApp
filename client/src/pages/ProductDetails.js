import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  ///initial product details
  useEffect(() => {
    if (params?.slug) getproduct();
  }, [params.slug]);

  /// get product
  const getproduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-Products/${params.slug}`
      );
      setProduct(data?.products);
      getSimilarProducts(data?.products?._id, data?.products?.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  /// get similar Products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/related-Product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          Image
          <img
            src={`/api/v1/products/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={300}
            width={350}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h5>Name : {product.name}</h5>
          <h5>description : {product.description}</h5>
          <h5>price : {product.price}</h5>
          <h5>category : {product?.category?.name}</h5>
          <button className="btn btn-secondary">🛒 Add To Cart</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No similar products Found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts.map((p) => (
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
                <button className="btn btn-secondary">🛒 Add To Cart</button>
                <button className="btn btn-primary">More Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
