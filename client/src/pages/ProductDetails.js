import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

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
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h5>Name : {product.name}</h5>
          <h5>description : {product.description}</h5>
          <h5>price : {product.price}</h5>
          {/* <h5>category : {product.category.name}</h5> */}
          <button className="btn btn-secondary">🛒 Add To Cart</button>
        </div>
      </div>
      <div className="row">Similar Products</div>
    </Layout>
  );
};

export default ProductDetails;
