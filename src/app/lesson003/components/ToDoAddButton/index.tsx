import React from "react";

export interface ToDoAddButtonProps {
  clickEvent: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ToDoAddButton = (props: ToDoAddButtonProps) => {
  return (
    <button onClick={props.clickEvent}>
      <div className="flex table-cell align-middle text-center w-12 h-12 border rounded-full border-black bg-green-500 text-black">
        <p>+</p>
      </div>
    </button>
  );
};

export default ToDoAddButton;
