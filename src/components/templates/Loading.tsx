import React from "react";
import loader from "../../assets/Bean Eater@1x-1.0s-200px-200px.gif";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-grey">
      <img className="h-[50%] object-cover" src={loader} />
    </div>
  );
};

export default Loading;
