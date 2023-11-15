import React from "react";

import PostCategory from "../components/Category/PostCategory";
import GetCategory from "../components/Category/GetCategory";
import "./style.css";

class Category extends React.Component {
  render() {
    return (
      <div className="body">
        <div className="row">
          <div className="col-md-6">
            <GetCategory />
          </div>
          <div className="col-md-6">
            <PostCategory />
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
