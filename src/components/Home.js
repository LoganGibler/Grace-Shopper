import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Home = ({username}) => {
  console.log("this is username", username)
  return (
    <div>
      <h1 className="text-center">Welcome to the Home component, {username}</h1>
    </div>
  );
};

export default Home;