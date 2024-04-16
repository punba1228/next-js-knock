import React, { useState } from "react";

export interface ToDoItemProps {
  id: string;
  labelText: string;
  clickEvent: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ToDoItem = (props: ToDoItemProps) => {
  // render
  return (
    <div className="flex align-middle h-7">
      <div className="flex w-full">
        <input type="checkbox" id={props.id} name="todo" value={props.id} />
        <label
          htmlFor={props.id}
          className="text-xs text-black content-center ml-3"
        >
          {props.labelText}
        </label>
      </div>
      <div>
        <button
          id={`delete-${props.id}`}
          onClick={props.clickEvent}
          className="w-6 h-6 bg-white text-black text-xs rounded-full"
        >
          x
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
