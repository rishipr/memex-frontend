import React from "react";
import "./NoEntries.scss";

import * as no_entries from "../img/no-entries-2.png";

const NoEntries = () => {
  return (
    <div className="empty-container">
      <img src={no_entries} alt="" />
      <div>No entries</div>
    </div>
  );
};

export default NoEntries;
