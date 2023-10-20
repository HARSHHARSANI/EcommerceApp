import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Profile = () => {
  ///context
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  ///state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { name, email, phone, address } = auth.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  ///form handle

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
      // if (res && res.data.success) {
      //   toast.success("User Registered Successfully", {
      //     duration: 8000,
      //   });
      //   navigate("/login");
      // } else {
      //   toast.error(res.data.message, {
      //     duration: 8000,
      //   });
      // }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  return (
    <Layout title={"Your profile Ecommerce-App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <h1>User Profile</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Mobile No."
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Address"
                  />
                </div>
                {/* <div className="mb-3">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="What is your Favourite Sports"
                    required
                  />
                </div> */}
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
