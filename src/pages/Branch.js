import React from "react";

import { GetBranch } from "../components/Branch/GetBranch";
import PostBranch from "../components/Branch/PostBranch";
import "./style.css";

class Branch extends React.Component {

  render() {
    return (
      <div className="body">
        <div className="row">
          <div className="col-md-8">
            <GetBranch />
          </div>
          <div className="col-md-4">
            <PostBranch />
          </div>
        </div>
      </div>
    );
  }
}

export default Branch;
