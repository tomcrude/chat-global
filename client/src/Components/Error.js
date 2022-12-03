import React from "react";
import { Link } from "react-router-dom";


export function Error() {
  
    return (
      <>
      <div className="container">
        <div className="row error-1 text-center">
      <h2 className="col-12 error-2">Error 404</h2>
      <Link to={"/"}>Return</Link>
      </div>
      </div>
      </>
    )
  }