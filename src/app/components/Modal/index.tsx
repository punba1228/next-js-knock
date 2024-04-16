import React from "react";

interface props {
  children: React.ReactNode;
}

const Modal = (props: props) => {
  return (
    <div className="w-full h-full bg-black bg-opacity-50 fixed">
      <div className="flex justify-center items-center h-full">
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
