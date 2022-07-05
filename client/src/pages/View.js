import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get/" + id)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);

  return (
    <div>
      <div class="ui card">
        <div class="content">
          <div class="header">Contact Details of: {user.name} </div>
        </div>
        <div class="content">
          <div class="meta">Name: {user.name}</div>
          <div class="description">Email: {user.email}</div>
          <div class="description">Conatct No.: {user.contact}</div>
        </div>
        <div class="extra content">
          <Link to="/">
            <button class="ui grey button">BACK</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
