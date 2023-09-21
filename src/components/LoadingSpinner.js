import React from "react";
import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner = () => {
  return (
    <div className="text-center" style={{ marginTop: 200, marginBottom: 250 }}>
      <Spinner
        animation="grow"
        variant="secondary"
        role="status"
        style={{ width: 100, height: 100 }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
