import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox } from "antd";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  /// get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  ///get all product
  const getallProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/get-Products");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  ///filter by categories
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    getallProduct();
  }, []);

  return (
    <Layout title={"All Product  - Best Offers"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filters By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center">Filters By Price</h4>
          <div className="d-flex flex-column">
            
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center"> All Products</h1>
          <div className="d-flex flex-wrap">
            {products.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <button className="btn btn-primary m-lg-1">
                    More Detail
                  </button>
                  <button className="btn btn-secondary">🛒 Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
