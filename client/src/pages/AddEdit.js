import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, email, contact } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get/" + id)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please Enter Data in Each Field");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            name,
            email,
            contact,
          })
          .then(() => {
            setState({ name: "", email: "", contact: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Data saved successfully");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        axios
          .put("http://localhost:5000/api/update/" + id, {
            name,
            email,
            contact,
          })
          .then(() => {
            setState({ name: "", email: "", contact: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Data updated successfully");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ margin: "100px" }}>
      <form class="ui form" onSubmit={handleSubmit}>
        <div class="field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name..."
            value={name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div class="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email..."
            value={email || ""}
            onChange={handleInputChange}
          />
        </div>
        <div class="field">
          <label htmlFor="contact">Contact No.</label>
          <input
            type="number"
            id="contact"
            name="contact"
            placeholder="Your contact..."
            value={contact || ""}
            onChange={handleInputChange}
          />
        </div>
        <div class="field">
          <input type="submit" value={id ? "UPDATE" : "SAVE"} />
        </div>
        <div class="field">
          <Link to="/">
            <input type="button" value="Back" />
          </Link>
        </div>
      </form>
      ;
    </div>
  );
};

export default AddEdit;
