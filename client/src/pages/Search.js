import React from "react";
import Layout from "../components/layout/layout";
import { useSearch } from "../context/Search";

const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.result.length < 1
              ? "No Product Found "
              : `Found ${values.result.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values.result.map((p) => (
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

export default Search;
