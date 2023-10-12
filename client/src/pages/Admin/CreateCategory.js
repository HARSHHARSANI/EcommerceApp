import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";

const CreateCategory = () => {
  return (
    <Layout title={"Create-Catagory Ecommerce-App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
