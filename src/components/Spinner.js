import React from "react";
import * as spinner from "../img/spinner.gif";

import "./Spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <img className="spinner" src={spinner} alt="" />
    </div>
  );
};

export default Spinner;
